from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.adapters.onebot.v11 import Bot
from nonebot import on_command, get_driver
from ...utils import get_type_id
from ...config import danmaku_config


sub_open = on_command("查看面板", priority=5)
sub_open.__doc__ = """查看面板"""


@sub_open.handle()
async def _(event: MessageEvent, bot: Bot):
    """查看面板"""
    driver = get_driver()
    host = danmaku_config.danmaku_host if danmaku_config.danmaku_host else f"http://{driver.config.host}:{driver.config.port}"
    type_id = await get_type_id(event)
    type = event.message_type
    url = f"{host}/danmaku/#/?type={type}&type_id={type_id}"
    await sub_open.finish(url)
