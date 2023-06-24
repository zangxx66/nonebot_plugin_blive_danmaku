from .utils import on_startup
from nonebot import get_driver, get_app
from nonebot.log import logger
from nonebot.plugin import PluginMetadata
from .config import Config as danmaku_config

__plugin_meta__ = PluginMetadata(
    name = "B站直播间路灯插件",
    description = "通过弹幕记录直播高能点",
    usage = "弹幕指令为'#路灯 加上记录的内容'，仅在开播时弹幕指令才会生效",
    type = "application",
    homepage = "https://github.com/zangxx66/nonebot_plugin_blive_danmaku",
    config = danmaku_config,
    supported_adapters = {"~onebot.v11"},
    extra = {}
)
__version__ = "0.3.0"

driver = get_driver()
driver.on_startup(on_startup)

from . import command, app
host = driver.config.host
port = driver.config.port
get_app().mount("/danmaku", app.app, name="blive-danmaku plugin")
logger.info("Web UI running on "
            f"http://{host}:{port}/danmaku/")
