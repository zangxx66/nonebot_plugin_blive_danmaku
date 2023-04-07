from .utils import on_startup
from nonebot import get_driver

get_driver().on_startup(on_startup)

from . import command
