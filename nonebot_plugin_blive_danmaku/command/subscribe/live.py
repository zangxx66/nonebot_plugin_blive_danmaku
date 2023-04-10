import time
from bilireq.live import get_rooms_info_by_uids, get_room_info_by_id
from ...utils import send_msg, scheduler, get_timespan
from nonebot import get_driver
from nonebot.log import logger
from nonebot.adapters.onebot.v11 import MessageSegment
from ...database import Db as db
from ...config import Config


live_uids = {}


@scheduler.scheduled_job(
    "interval", seconds=12, id="live_sched"
)
async def live():
    """开播提醒"""
    plugin_config = Config.parse_obj(get_driver().config)
    if plugin_config.danmaku_group_notice is False:
        return
    sub_list = await db.get_subs()
    uids = []
    for x in sub_list:
        uids.append(x.uid)

    if not uids:
        return
    
    res = await get_rooms_info_by_uids(uids, reqtype="web", proxies=None)
    if not res:
        return
    for uid, info in res.items():
        live_status = 0 if info["live_status"] == 2 else info["live_status"]
        if uid not in live_uids:
            live_uids[uid] = uid
            continue
        status = live_uids[uid]
        if live_status == status:
            continue
        live_uids[uid] = uid

        name = info["uname"]
        room_id = info["short_id"] if info["short_id"] else info["room_id"]
        room_info = await get_room_info_by_id(room_id, reqtype="web")
        start_timespan = get_timespan(room_info["live_time"])
        if live_status:
            logger.info(f"{name} 开播了")
            url = f"https://live.bilibili.com/{room_id}"
            cover = (
                info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
            )
            title = info["title"]
            msg = f"{name} 正在直播：\n{title}\n{MessageSegment.image(cover)}\n{url}"

            room = db.get_room(room_id=room_id, uid=uid, start_time=start_timespan)
            if not room:
                await db.add_room(room_id=room_id, cover=cover, title=info["title"], name=info["uname"], start_time=start_timespan, end_time=0)
        else:
            logger.info(f"{name} 下播了")
            cover = (
                info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
            )
            msg = f"{name} 下播了\n{MessageSegment.image(cover)}"

            now = int(time.time())
            await db.update_room("end_time", now, room_id=room_id, uid=uid, start_time=start_timespan)
        sub_list = await db.get_subs(uid=uid)
        for sub in sub_list:
            await send_msg(bot_id=sub.bot_id, send_type=sub.type, type_id=sub.type_id, message=msg)
            