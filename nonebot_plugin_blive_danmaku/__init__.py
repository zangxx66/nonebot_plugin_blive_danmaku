from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.adapters.onebot.v11 import Bot
from nonebot.params import ArgPlainText
from nonebot import on_command
from .utils import get_type_id,handle_uid,permission_check,uid_check, on_startup
from bilireq.user import get_user_info
from bilireq.exceptions import ResponseCodeError
from nonebot import get_driver

get_driver().on_startup(on_startup)

from .database import Db as db
from .pusher import *

sub_add = on_command("添加订阅", priority=5)
sub_add.__doc__ = """添加订阅 UID"""
sub_add.handle()(permission_check)
sub_add.handle()(handle_uid)
sub_add.got("uid", prompt="请输入一个UID")(uid_check)

@sub_add.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """添加订阅"""
    type_id = await get_type_id(event)
    try:
        user = await get_user_info(uid, reqtype="web", proxies=None)
    except ResponseCodeError as ex:
        if ex.code == -400 or ex.code == -404:
            await sub_add.finish(f"UID {uid}不存在，请检查后重试")
        elif ex.code == -412:
            await sub_add.finish(f"操作过于频繁，请半小时后再试")
        else:
            await sub_add.finish("发送未知错误")
    res = await db.add_sub(uid=uid, type=event.message_type, type_id=type_id, street_lamp=True, bot_id=event.self_id)
    name = user["name"]
    if res:
        await sub_add.finish(f"添加订阅 {name}({uid}) 成功")
    await sub_add.finish(f"{name}({uid}) 已经订阅")


sub_delete = on_command("取消订阅", priority=5)
sub_delete.__doc__ = """取消订阅 UID"""
sub_delete.handle()(permission_check)
sub_delete.handle()(handle_uid)
sub_delete.got("uid", prompt="请输入一个UID")(uid_check)

@sub_delete.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """取消订阅"""
    type_id = await get_type_id(event)
    try:
        user = await get_user_info(uid, reqtype="web", proxies=None)
    except ResponseCodeError as ex:
        if ex.code == -400 or ex.code == -404:
            await sub_delete.finish(f"UID {uid}不存在，请检查后重试")
        elif ex.code == -412:
            await sub_delete.finish(f"操作过于频繁，请半小时后再试")
        else:
            await sub_delete.finish("发送未知错误")
    res = await db.delete_sub(uid=uid, type_id=type_id, type=event.message_type)
    name = user["name"]
    if res:
        await sub_delete.finish(f"已取消订阅 {name}({uid})")
    await sub_delete.finish(f"未订阅 {name}({uid})")


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
        await sub_on.finish(f'已开启 {uid} 路灯')
    await sub_on.finish(f'未订阅 {uid}')


sub_list = on_command("订阅列表", priority=5)
sub_list.__doc__ = """订阅列表"""
sub_list.handle()(permission_check)

@sub_list.handle()
async def _(event: MessageEvent, bot: Bot):
    """查看订阅列表"""
    type_id = await get_type_id(event)
    subs = await db.get_subs(type=event.message_type, type_id=type_id)
    msg = "订阅列表：\n\n"
    for sub in subs:
        user = await get_user_info(sub.uid, reqtype="web", proxies=None)
        name = user["name"]
        msg += (
            f"{name}({sub.uid})"
            f"路灯：{'开' if sub.street_lamp else '关'}"
        )
    await sub_list.finish(msg)

