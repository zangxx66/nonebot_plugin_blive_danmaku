from ...database import Db as db
from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id,handle_uid,permission_check,uid_check
from bilireq.user import get_user_info
from bilireq.exceptions import ResponseCodeError

sub_add = on_command("添加订阅", priority=5)
sub_add.__doc__ = """添加订阅 UID"""
sub_add.handle()(permission_check)
sub_add.handle()(handle_uid)
sub_add.got("uid", prompt="请输入一个UID")(uid_check)

@sub_add.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """添加订阅"""
    try:
        user = await get_user_info(uid, reqtype="web", proxies=None)
    except ResponseCodeError as ex:
        if ex.code == -400 or ex.code == -404:
            await sub_add.finish(f"UID {uid}不存在，请检查后重试")
        elif ex.code == -412:
            await sub_add.finish(f"操作过于频繁，请半小时后再试")
        else:
            await sub_add.finish("发送未知错误")
    type_id = await get_type_id(event)
    sub = await db.get_sub(uid=uid, type=event.message_type, type_id=type_id, bot_id=event.self_id)
    name = user["name"]
    if sub is not None:
        await sub_add.finish(f"{name}({uid}) 已经订阅")

    res = await db.add_sub(uid=uid, type=event.message_type, type_id=type_id, street_lamp=True, bot_id=event.self_id)
    if res:
        await sub_add.finish(f"添加订阅 {name}({uid}) 成功")
    else:
        await sub_add.finish(f'添加订阅 {name}({uid}) 失败')
