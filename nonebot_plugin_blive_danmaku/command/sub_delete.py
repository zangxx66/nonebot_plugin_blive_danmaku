from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ..utils import get_type_id,handle_uid,permission_check,uid_check
from bilireq.user import get_user_info
from bilireq.exceptions import ResponseCodeError
from ..database import Db as db

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
