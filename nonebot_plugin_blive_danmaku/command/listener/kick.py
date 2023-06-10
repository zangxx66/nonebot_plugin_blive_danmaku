from nonebot.plugin import on_notice
from nonebot.adapters.onebot.v11 import Bot
from nonebot.adapters.onebot.v11.event import GroupDecreaseNoticeEvent
from nonebot.log import logger
from ...database.db import Db as db

notice_listener = on_notice(priority=5)

@notice_listener.handle()
async def handle_group_kick(bot: Bot, event: GroupDecreaseNoticeEvent):
    """
    Bot退群后清除该群的订阅
    """
    if event.sub_type == "kick":
        return
    group_id = event.group_id
    await db.delete_sub(type="group", type_id=group_id)
    group_info = await bot.get_group_info(group_id=group_id)
    if event.sub_type == "kick_me":
        kill_me_user = await bot.get_stranger_info(user_id=event.operator_id)
        logger.warning(f'我被{kill_me_user["nickname"]}({event.operator_id})踢出群{group_info["group_name"]}({group_id})啦~~~')
    if event.sub_type == "leave":
        logger.info(f'主动退出群{group_info["group_name"]}({group_id})')
