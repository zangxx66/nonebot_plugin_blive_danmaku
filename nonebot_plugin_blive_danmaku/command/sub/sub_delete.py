from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import get_type_id, handle_uid, permission_check, uid_check
from bilireq.exceptions import GrpcError
from bilireq.grpc.dynamic import grpc_get_user_dynamics
from ...database import Db as db

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
        dy = (await grpc_get_user_dynamics(int(uid))).list
        name = dy[0].modules[0].module_author.author.name
    except GrpcError as ex:
        await sub_delete.finish(f"发生未知错误：{ex.code} -> {ex.msg}，请联系开发者")
    res = await db.delete_sub(uid=uid, type_id=type_id, type=event.message_type)
    if res:
        await sub_delete.finish(f"已取消订阅 {name}({uid})")
    await sub_delete.finish(f"未订阅 {name}({uid})")
