from ...database import Db as db
from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id, handle_uid, permission_check, uid_check
from bilireq.grpc.dynamic import grpc_get_user_dynamics
from bilireq.exceptions import GrpcError

sub_add = on_command("添加订阅", priority=5)
sub_add.__doc__ = """添加订阅 UID"""
sub_add.handle()(permission_check)
sub_add.handle()(handle_uid)
sub_add.got("uid", prompt="请输入一个UID")(uid_check)


@sub_add.handle()
async def _(event: MessageEvent, uid: str = ArgPlainText("uid")):
    """添加订阅"""
    try:
        dy = (await grpc_get_user_dynamics(int(uid))).list
        name = dy[0].modules[0].module_author.author.name
    except GrpcError as ex:
            await sub_add.finish(f"发生未知错误：{ex.code} -> {ex.msg}，请联系开发者")
    type_id = await get_type_id(event)
    sub = await db.get_sub(uid=uid, type=event.message_type, type_id=type_id, bot_id=event.self_id)
    if sub is not None:
        await sub_add.finish(f"{name}({uid}) 已经订阅")

    res = await db.add_sub(uid=uid, type=event.message_type, type_id=type_id, street_lamp=True, bot_id=event.self_id)
    if res:
        await sub_add.finish(f"添加订阅 {name}({uid}) 成功")
    else:
        await sub_add.finish(f'添加订阅 {name}({uid}) 失败')
