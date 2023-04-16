from .utils import on_startup
from nonebot import get_driver, get_app
from nonebot.log import logger

driver = get_driver()
driver.on_startup(on_startup)

from . import command, app
host = driver.config.host
port = driver.config.port
get_app().mount("/danmaku", app.app, name="blive-danmaku plugin")
logger.info("Web UI running on "
            f"http://{host}:{port}/danmaku/")
