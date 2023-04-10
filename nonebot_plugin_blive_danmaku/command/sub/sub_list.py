from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.adapters.onebot.v11 import Bot
from nonebot import on_command
from ...utils import get_type_id,permission_check
from bilireq.user import get_user_info
from ...database import Db as db


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
            f"开播提醒：{'开' if sub.live else '关'}"
        )
    await sub_list.finish(msg)
