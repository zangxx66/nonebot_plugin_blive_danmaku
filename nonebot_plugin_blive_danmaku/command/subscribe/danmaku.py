import time
import asyncio
import http.cookies
import aiohttp
from typing import Optional
from bilireq.live import get_rooms_info_by_uids, get_room_info_by_id

from ...utils import send_msg, get_timespan, get_time_difference, scheduler
from ...blivedm import blivedm
from ...blivedm.blivedm.models import web as web_models
from ...database import Db as db
from nonebot.log import logger
from ...config import danmaku_config
from nonebot import get_driver


class ClientModel:
    def __init__(self, room_id, cookie):
        self.uid = ""
        self.name = ""
        self.live_time = 0
        self.client = blivedm.BLiveClient(room_id, session=cookie)


clients: list[ClientModel] = []
driver = get_driver()
host = danmaku_config.danmaku_host if danmaku_config.danmaku_host else f"http://{driver.config.host}:{driver.config.port}"
session: Optional[aiohttp.ClientSession] = None


@scheduler.scheduled_job(
    "interval", seconds=15, id="street_lamp_sched"
)
async def danmaku():
    """ 连接直播间 """
    uids = db.get_sub_list("street_lamp")

    if not uids:
        return

    try:
        res = await get_rooms_info_by_uids(uids, reqtype="web", proxies=None)
    except Exception as ex:
        logger.error(f"get_rooms_info_by_uids错误:\n{ex}")
        return

    if not res:
        return

    logger.debug('爬取路灯列表')
    handler = MsgHandler()
    cookies = http.cookies.SimpleCookie()
    cookies["SESSDATA"] = await db.get_cookie()
    cookies["SESSDATA"]["domain"] = "bilibili.com"

    for uid, info in res.items():
        new_status = 0 if info["live_status"] == 2 else info["live_status"]
        index = [x for x in clients if x.uid == uid]

        if not index and new_status:
            logger.info(f'{info["uname"]}开播了，连接直播间')
            room_id = info["short_id"] if info["short_id"] else info["room_id"]
            room_info = await get_room_info_by_id(room_id, reqtype="web")
            start_timespan = get_timespan(room_info["live_time"])

            global session

            if session is None:
                session = aiohttp.ClientSession()
                session.cookie_jar.update_cookies(cookies)

            model = ClientModel(room_id, session)
            model.client.set_handler(handler)
            model.client.start()
            model.uid = uid
            model.name = info["uname"]
            model.live_time = start_timespan
            clients.append(model)

            room = await db.get_room(room_id=room_id, uid=uid, start_time=start_timespan)

            if room is None:
                cover = (
                    info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
                )
                await db.add_room(room_id=room_id, uid=uid,
                                  cover=cover, title=info["title"],
                                  name=info["uname"], start_time=start_timespan, end_time=0, watch_person=0)

        if index and not new_status:
            model = index[0]
            await live_off(model)


class MsgHandler(blivedm.BaseHandler):
    def _on_danmaku(self, client: blivedm.BLiveClient, message: web_models.DanmakuMessage):
        if (message.msg.startswith("#路灯")):
            logger.info(f'{client.room_owner_uid}的直播间收到路灯：{message.uname} -> {message.msg}')
        asyncio.create_task(save_danmaku(client.room_id, client.room_owner_uid, message.uname, int(message.timestamp / 1000), message.msg))

    def _on_buy_guard(self, client: blivedm.BLiveClient, message: web_models.GuardBuyMessage):
        logger.debug(f"[{client.room_id}] {message.username} 购买{message.gift_name}")

    def _on_super_chat(self, client: blivedm.BLiveClient, message: web_models.SuperChatMessage):
        logger.info(f"[{client.room_id}] SC ¥{message.price} {message.uname}：{message.message}")
        asyncio.create_task(save_gift(client.room_id,
                        client.room_owner_uid,
                        message.uname, message.uid,
                        message.message,
                        message.price, 1,
                        "sc", message.guard_level))

    def _on_gift(self, client: blivedm.BLiveClient, message: web_models.GiftMessage):
        coin = message.total_coin / 1000
        logger.debug(f"[{client.room_id}] {message.uname} 赠送{message.gift_name}x{message.num} ¥{coin}")

    def _on_heartbeat(self, client: blivedm.BLiveClient, message: web_models.HeartbeatMessage):
        logger.debug(f"[{client.room_id}] 当前人气值：{message.popularity}")

    def _on_watched(self, client: blivedm.BLiveClient, message: web_models.WatchedMessage):
        asyncio.create_task(update_watched(client.room_id, message.num))


async def update_watched(room_id, num):
    room_list = await db.get_rooms(room_id=room_id, end_time=0)
    room_list.sort(key=lambda x: x.start_time, reverse=True)
    room = room_list[0]
    if room is None:
        return
    await db.update_room("watch_person", num, id=room.id)


async def live_off(model: ClientModel):
    if not model:
        return
    await disconnect_room(model)
    now = int(time.time())
    room = await db.get_room(room_id=model.client.room_id, start_time=model.live_time)
    if room is None:
        return
    await db.update_room("end_time", now, id=room.id)
    subs = await db.get_subs(uid=room.uid, street_lamp=True)
    for sub in subs:
        msg = (f'{model.name}下播了，'
               '可前往面板查看本次直播的路灯记录：'
               f'{host}/danmaku/#/room?roomid={room.id}&type={sub.type}&type_id={sub.type_id}&uid={sub.uid}')
        await send_msg(bot_id=sub.bot_id, send_type=sub.type, type_id=sub.type_id, message=msg)


async def disconnect_room(model: ClientModel):
    client = model.client
    try:
        asyncio.gather(client.join())
    finally:
        await asyncio.gather(client.stop_and_close())
        clients.remove(model)
        logger.info(f'{model.name} 断开直播间连接')


async def save_danmaku(room_id, uid, send_name: str, timestamp: int, raw_msg: str):
    datetime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(timestamp))
    index = [x for x in clients if x.uid == str(uid)]
    if not index:
        return
    model = index[0]
    dt = get_time_difference(model.live_time, timestamp)
    room = await db.get_room(room_id=room_id, start_time=model.live_time)
    if room is None:
        return
    danmaku_type = "danamku"
    statistics_list = await db.get_subs(uid=uid, statistics=True)
    if raw_msg.startswith("#路灯"):
        blive_danmaku = raw_msg.replace("#路灯", "", 1).strip()
        if not blive_danmaku:
            return
        street_lamp = f'【{model.name}】 在 {datetime}({dt}) 收到了 {send_name} 发来的路灯【{blive_danmaku}】'
        danmaku_type = "street_lamp"
        subs = await db.get_subs(uid=uid, street_lamp=True)
        for sub in subs:
            await send_msg(bot_id=sub.bot_id, send_type=sub.type, type_id=sub.type_id, message=street_lamp)
        await db.add_danmaku(room_id=room.id,
                             uname=send_name,
                             message=raw_msg,
                             create_time=datetime,
                             live_duration=dt,
                             type=danmaku_type)
    if danmaku_type == "danamku" and len(statistics_list) > 0:
        await db.add_danmaku(room_id=room.id,
                             uname=send_name,
                             message=raw_msg,
                             create_time=datetime,
                             live_duration=dt,
                             type=danmaku_type)


async def save_gift(room_id, uid, send_name: str, send_uid: int, name: str, price: int, num: int, type: str, guard_level: int):
    datetime = int(time.time())
    index = [x for x in clients if x.uid == str(uid)]
    if not index:
        return
    model = index[0]
    dt = get_time_difference(model.live_time, datetime)
    room = await db.get_room(room_id=room_id, start_time=model.live_time)
    if room is None:
        return

    coin = price if type == 'sc' else price / 1000
    await db.add_gift(rid=room.id,
                      name=name,
                      price=coin,
                      num=num,
                      uname=send_name,
                      uid=send_uid,
                      type=type,
                      create_time=datetime,
                      live_duration=dt,
                      guard=guard_level)
