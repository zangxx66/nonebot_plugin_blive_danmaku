from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.adapters.onebot.v11 import Bot
from nonebot import on_command, get_driver
from ...utils import get_type_id

url_open = on_command("查看历史记录", priority=5)
url_open.__doc__ = """查看历史记录"""

@url_open.handle()
async def _(event: MessageEvent, bot: Bot):
    """返回fastapi的路径"""
    driver = get_driver()
    type = event.message_type
    type_id = get_type_id(event)
    msg = f"http://{driver.config.host}:{driver.config.port}/danmaku/#/?type={type}&type_id={type_id}"
    await url_open.finish(msg)
