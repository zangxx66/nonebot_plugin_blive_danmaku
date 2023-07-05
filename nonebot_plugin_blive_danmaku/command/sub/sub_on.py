from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id, handle_uid, permission_check, uid_check
from ...database import Db as db

sub_on = on_command("开启路灯", priority=5)
sub_on.__doc__ = """开启路灯 UID"""
sub_on.handle()(permission_check)
sub_on.handle()(handle_uid)
sub_on.got("uid", prompt="请输入一个UID")(uid_check)


@sub_on.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """开启路灯"""
    type_id = await get_type_id(event)
    res = await db.update_sub("street_lamp", True, uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await sub_on.finish(f'已开启 {uid} 路灯')
    await sub_on.finish(f'未订阅 {uid}')


sub_statistics_on = on_command("开启统计", priority=5)
sub_statistics_on.__doc__ = """开启统计 UID"""
sub_statistics_on.handle()(permission_check)
sub_statistics_on.handle()(handle_uid)
sub_statistics_on.got("uid", prompt="请输入一个UID")(uid_check)


@sub_statistics_on.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """开启统计"""
    type_id = await get_type_id(event)
    sub = await db.get_sub(uid=uid, type_id=type_id, type=event.message_type)
    if not sub:
        await sub_statistics_on.finish(f'未订阅 {uid}')
    res = await db.update_sub("statistics", True, uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await sub_statistics_on.finish(f'已开启 {uid} 弹幕统计')
    else:
        await sub_statistics_on.finish(f'开启 {uid} 弹幕统计，失败，请重试')
