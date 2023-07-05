from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id, handle_uid, permission_check, uid_check
from ...database import Db as db

sub_off = on_command("关闭路灯", priority=5)
sub_off.__doc__ = """关闭路灯 UID"""
sub_off.handle()(permission_check)
sub_off.handle()(handle_uid)
sub_off.got("uid", prompt="请输入一个UID")(uid_check)


@sub_off.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """关闭路灯"""
    type_id = await get_type_id(event)
    res = await db.update_sub("street_lamp", False, uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await sub_off.finish(f'已开启 {uid} 路灯')
    await sub_off.finish(f'未订阅 {uid}')


sub_statistics_off = on_command("关闭统计", priority=5)
sub_statistics_off.__doc__ = """关闭统计 UID"""
sub_statistics_off.handle()(permission_check)
sub_statistics_off.handle()(handle_uid)
sub_statistics_off.got("uid", prompt="请输入一个UID")(uid_check)


@sub_statistics_off.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """关闭统计"""
    type_id = await get_type_id(event)
    sub = await db.get_sub(uid=uid, type_id=type_id, type=event.message_type)
    if not sub:
        await sub_statistics_off.finish(f'未订阅 {uid}')
    res = await db.update_sub("statistics", False, uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await sub_statistics_off.finish(f'已关闭 {uid} 弹幕统计')
    else:
        await sub_statistics_off.finish(f'关闭 {uid} 弹幕统计，失败，请重试')
