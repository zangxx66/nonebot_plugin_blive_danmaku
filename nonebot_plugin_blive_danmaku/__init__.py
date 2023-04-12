from .utils import on_startup
from nonebot import get_driver, get_app
from nonebot.log import logger

get_driver().on_startup(on_startup)

from . import command, app
get_app().mount("/danmaku", app.app, name="blive-danmaku plugin")
logger.info("Web UI running on "
            f"http://{get_driver().config.host}:{get_driver().config.port}/danmaku/")
