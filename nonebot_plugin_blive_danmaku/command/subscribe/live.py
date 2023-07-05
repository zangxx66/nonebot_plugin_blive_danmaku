from bilireq.live import get_rooms_info_by_uids
from ...utils import send_msg, scheduler
from nonebot.log import logger
from nonebot.adapters.onebot.v11 import MessageSegment
from ...database import Db as db
from ...config import danmaku_config


live_uids = {}


@scheduler.scheduled_job(
    "interval", seconds=12, id="live_sched"
)
async def live():
    """开播提醒"""
    if danmaku_config.danmaku_group_notice is False:
        return
    uids = db.get_sub_list("live")

    if not uids:
        return
    try:
        res = await get_rooms_info_by_uids(uids, reqtype="web", proxies=None)
    except Exception as ex:
        logger.error(f"开播提醒get_rooms_info_by_uids错误:\n{ex}")
        return
    if not res:
        return
    for uid, info in res.items():
        live_status = 0 if info["live_status"] == 2 else info["live_status"]
        name = info["uname"]
        room_id = info["short_id"] if info["short_id"] else info["room_id"]
        if uid not in live_uids:
            live_uids[uid] = live_status
            continue
        status = live_uids[uid]
        if live_status == status:
            continue
        live_uids[uid] = live_status

        if live_status:
            logger.info(f"{name} 开播了")
            url = f"https://live.bilibili.com/{room_id}"
            cover = (
                info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
            )
            title = info["title"]
            msg = f"{name} 正在直播：\n{title}\n{MessageSegment.image(cover)}\n{url}"
        else:
            logger.info(f"{name} 下播了")
            cover = (
                info["cover_from_user"] if info["cover_from_user"] else info["keyframe"]
            )
            msg = f"{name} 下播了\n{MessageSegment.image(cover)}"
        sub_list = await db.get_subs(uid=uid)
        for sub in sub_list:
            await send_msg(bot_id=sub.bot_id, send_type=sub.type, type_id=sub.type_id, message=msg)
