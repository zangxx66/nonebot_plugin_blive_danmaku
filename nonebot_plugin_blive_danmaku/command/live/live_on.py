from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id,handle_uid,permission_check,uid_check
from ...database import Db as db

live_on = on_command("开启直播推送", priority=5)
live_on.__doc__ = """开启直播推送 UID"""
live_on.handle()(permission_check)
live_on.handle()(handle_uid)
live_on.got("uid", prompt="请输入一个UID")(uid_check)

@live_on.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """开启开播提醒"""
    type_id = await get_type_id(event)
    res = await db.update_sub("live", True, uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await live_on.finish(f'已开启 {uid} 开播提醒')
    await live_on.finish(f'未订阅 {uid}')
