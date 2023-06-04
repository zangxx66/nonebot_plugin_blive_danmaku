import time
import asyncio
from bilireq.live import get_rooms_info_by_uids, get_room_info_by_id
from ...utils import send_msg, get_timespan, get_time_difference, scheduler
from ...blivedm import blivedm
from ...database import Db as db
from nonebot.log import logger
from ...config import danmaku_config
from nonebot import get_driver
import httpx
from io import BytesIO
import os
from PIL import Image
from pathlib import Path


class ClientModel:
    def __init__(self, room_id):
        self.uid=""
        self.name=""
        self.live_time=0
        self.client=blivedm.BLiveClient(room_id)


clients = []
driver = get_driver()
host = danmaku_config.danmaku_host if danmaku_config.danmaku_host else f"http://{driver.config.host}:{driver.config.port}"
full_path = Path(__file__).parent.parent.parent / "app" / "frontend" / "static"
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}

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
    logger.debug(f'爬取路灯列表')
    handler = MsgHandler()
    for uid, info in res.items():
        new_status = 0 if info["live_status"] == 2 else info["live_status"]
        index = [x for x in clients if x.uid == uid]
        if not index:
            if new_status:
                logger.info(f'{info["uname"]}开播了，连接直播间')
                room_id = info["short_id"] if info["short_id"] else info["room_id"]
                room_info = await get_room_info_by_id(room_id, reqtype="web")
                model = ClientModel(room_id)
                model.client.add_handler(handler)
                model.client.start()
                model.uid=uid
                model.name=info["uname"]
                model.live_time=get_timespan(room_info["live_time"])
                clients.append(model)

                cover = (
                    info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
                )
                start_timespan = get_timespan(room_info["live_time"])
                room = await db.get_room(room_id=room_id, uid=uid, start_time=start_timespan)
                if not room:
                    filename = os.path.basename(cover)
                    save_path = os.path.join(full_path, filename)
                    save_cover = ""
                    if not os.path.isfile(save_path):
                        try:
                            async with httpx.AsyncClient() as httpClient:
                                rep = await httpClient.get(cover, headers=headers)
                                assert rep.status_code == 200
                                img = Image.open(BytesIO(rep.content))
                                img.save(save_path)
                                save_cover = f'/static/{filename}'
                        except Exception as ex:
                            logger.error(f"保存封面异常：\n{ex}")
                    else:
                        save_cover = f'/static/{filename}'
                    await db.add_room(room_id=room_id, uid=uid, cover=save_cover if save_cover else cover, title=info["title"], name=info["uname"], start_time=start_timespan, end_time=0)
        else:
            if new_status == 0:
                model = index[0]
                client = model.client
                room_id = info["short_id"] if info["short_id"] else info["room_id"]
                try:
                    asyncio.gather(client.join())
                finally:
                    await asyncio.gather(client.stop_and_close())
                    clients.remove(model)
                    logger.info(f'{info["uname"]}下播了，断开直播间连接')
                now = int(time.time())
                room_list = await db.get_rooms(room_id=room_id, uid=uid)
                room_list.sort(key=lambda x:x.start_time, reverse=True)
                room = room_list[0]
                await db.update_room("end_time", now, id=room.id)

                subs = await db.get_subs(uid=uid,street_lamp=True)
                for sub in subs:
                    msg = f'{info["uname"]}下播了，可前往面板查看本次直播的路灯记录：{host}/danmaku/#/room?roomid={room.id}&type={sub.type}&type_id={sub.type_id}&uid={sub.uid}'
                    await send_msg(bot_id=sub.bot_id,send_type=sub.type,type_id=sub.type_id,message=msg)

    

class MsgHandler(blivedm.BaseHandler):
    async def _on_danmaku(self, client: blivedm.BLiveClient, message: blivedm.DanmakuMessage):
        if(message.msg.startswith("#路灯")):
            logger.info(f'{client.room_owner_uid}的直播间收到路灯：{message.uname} -> {message.msg}')
            subs = await db.get_subs(uid=client.room_owner_uid)
            if not subs:
                return
            for sub in subs:
                index = [x for x in clients if x.uid == str(sub.uid)]
                if not index:
                    continue
                model = index[0]
                if sub.street_lamp is False:
                    await disconnect_room(model)
                    continue
                dt = get_time_difference(model.live_time)
                datetime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                blive_danmaku = message.msg.replace("#路灯","", 1).strip()
                msg = f'【{model.name}】 在 {datetime}({dt}) 收到了 {message.uname} 发来的路灯【{blive_danmaku}】'
                await send_msg(bot_id=sub.bot_id,send_type=sub.type,type_id=sub.type_id,message=msg)

                room_list = await db.get_rooms(room_id=client.room_id, uid=sub.uid)
                room_list.sort(key=lambda x:x.start_time, reverse=True)
                room = room_list[0]
                await db.add_danmaku(room_id=room.id, uname=message.uname, message=blive_danmaku, create_time=datetime, live_duration=dt)
    
    async def _on_buy_guard(self, client: blivedm.BLiveClient, message: blivedm.GuardBuyMessage):
        logger.debug(f"[{client.room_id}] {message.username} 购买{message.gift_name}")
    
    async def _on_super_chat(self, client: blivedm.BLiveClient, message: blivedm.SuperChatMessage):
        logger.debug(f"[{client.room_id}] SC ¥{message.price} {message.uname}：{message.message}")
    
    async def _on_gift(self, client: blivedm.BLiveClient, message: blivedm.GiftMessage):
        logger.debug(f"[{client.room_id}] {message.uname} 赠送{message.gift_name}x{message.num}")
    
    async def _on_heartbeat(self, client: blivedm.BLiveClient, message: blivedm.HeartbeatMessage):
        logger.debug(f"[{client.room_id}] 当前人气值：{message.popularity}")


async def disconnect_room(model):
    client = model.client
    try:
        asyncio.gather(client.join())
    finally:
        await asyncio.gather(client.stop_and_close())
        clients.remove(model)
        logger.info(f'{model.name} 断开直播间连接')
