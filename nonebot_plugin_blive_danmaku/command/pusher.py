import time
import asyncio
from bilireq.live import get_rooms_info_by_uids, get_room_info_by_id
from ..utils import send_msg, get_timespan, get_time_difference
from ..blivedm import blivedm
from ..database import Db as db
from nonebot.log import logger
from nonebot import require, get_driver
require("nonebot_plugin_apscheduler")
from nonebot_plugin_apscheduler import scheduler


class ClientModel:
    def __init__(self, room_id):
        self.uid=""
        self.name=""
        self.live_time=0
        self.client=blivedm.BLiveClient(room_id)


clients = []


@scheduler.scheduled_job(
    "interval", seconds=15, id="street_lamp_sched"
)
async def danmaku():
    """ 连接直播间 """
    uids = db.get_sub_list()

    if not uids:
        return
    
    res = await get_rooms_info_by_uids(uids, reqtype="web", proxies=None)
    if not res:
        return
    logger.info(f'爬取路灯列表')
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
        else:
            if new_status == 0:
                model = index[0]
                client = model.client
                try:
                    asyncio.gather(client.join())
                finally:
                    await asyncio.gather(client.stop_and_close())
                    clients.remove(model)
                    logger.info(f'{info["uname"]}下播了，断开直播间连接')
    

class MsgHandler(blivedm.BaseHandler):
    async def _on_danmaku(self, client: blivedm.BLiveClient, message: blivedm.DanmakuMessage):
        if(message.msg.startswith("#路灯")):
            subs = await db.get_subs(uid=client.room_owner_uid)
            if not subs:
                return
            for sub in subs:
                index = [x for x in clients if x.uid == str(sub.uid)]
                model = index[0]
                logger.info(f'{model.name}的直播间收到路灯：{message.uname} -> {message.msg}')
                dt = get_time_difference(model.live_time)
                datetime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                msg = f'【{model.name}】 在 {datetime}({dt}) 收到了 {message.uname} 发来的路灯【{message.msg.replace("#路灯","", 1).strip()}】'
                await send_msg(bot_id=sub.bot_id,send_type=sub.type,type_id=sub.type_id,message=msg)

