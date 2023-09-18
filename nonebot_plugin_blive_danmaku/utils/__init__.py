import nonebot
import time
from pathlib import Path
from typing import Union
from nonebot import require
from nonebot.log import logger
from nonebot.matcher import Matcher
from nonebot.params import ArgPlainText, CommandArg
from nonebot.adapters.onebot.v11 import (
    ActionFailed,
    Bot,
    Message,
    NetworkError,
)
from nonebot.adapters.onebot.v11.event import GroupMessageEvent, PrivateMessageEvent
from nonebot.adapters.onebot.v11.permission import GROUP_ADMIN, GROUP_OWNER
from nonebot.exception import FinishedException
from nonebot.permission import SUPERUSER
from nonebot import require
require("nonebot_plugin_apscheduler")
from nonebot_plugin_apscheduler import scheduler


def get_path(*other):
    """获取数据文件路径"""
    dir_path = Path.cwd().joinpath("data")
    return str(dir_path.joinpath(*other))


async def handle_uid(matcher: Matcher, command_arg: Message = CommandArg(),):
    """获取uid"""
    uid = command_arg.extract_plain_text().strip()
    if uid:
        matcher.set_arg("uid", command_arg)


async def uid_check(matcher: Matcher, uid: str = ArgPlainText("uid"),):
    """检查uid合法性"""
    uid = uid.strip()
    if not uid.isdecimal():
        await matcher.finish("UID 必须为纯数字")
    matcher.set_arg("uid", Message(uid))


async def handle_cookie(matcher: Matcher, command_arg: Message = CommandArg(),):
    cookie = command_arg.extract_plain_text().strip()
    if cookie:
        matcher.set_arg("cookie", command_arg)


async def cookie_check(matcher: Matcher, cookie: str = ArgPlainText("cookie"),):
    cookie = cookie.strip()
    if not cookie:
        await matcher.finish("请输入cookie")
    matcher.set_arg("cookie", Message(cookie))


async def permission_check(bot: Bot, event: Union[GroupMessageEvent, PrivateMessageEvent]):
    """检查管理员权限"""
    from ..database import Db as db

    if isinstance(event, PrivateMessageEvent):
        if event.sub_type == "group":  # 不处理群临时会话
            raise FinishedException
        return
    if isinstance(event, GroupMessageEvent):
        if await (GROUP_ADMIN | GROUP_OWNER | SUPERUSER)(bot, event):
            return
    await bot.send(event, "权限不足，目前只有管理员才能使用")
    raise FinishedException


async def send_msg(bot_id, send_type, type_id, message):
    async def send(bot, send_type, type_id, message):
        result = await bot.call_api(
                "send_" + send_type + "_msg",
                **{
                    "message": message,
                    "user_id" if send_type == "private" else "group_id": type_id,
                },
            )
        return result
    bots = nonebot.get_bots()
    bot = bots.get(str(bot_id))
    if bot is None:
        logger.error("未连接任何Bot，推送消息失败")
        for key, item in bots.items():
            await send(item, send_type, type_id, message)
        logger.warning("尝试使用其他Bot推送消息")
        return
    try:
        await send(bot, send_type, type_id, message)
    except ActionFailed as ex:
        if ex.info["msg"] == "GROUP_NOT_FOUND":
            from ..database import Db as db

            await db.delete_sub(type="group", type_id=type_id)
            logger.error(f"推送消息失败，未找到群{type_id}，已清理无效的订阅")
        elif ex.info["msg"] == "SEND_MSG_API_ERROR":
            logger.error(f"推送消息失败，账号可能被风控\n{ex.info}")
        else:
            logger.error(f"推送消息失败，发生未知错误\n{ex.info}")
    except NetworkError as ex:
        logger.error(f"推送消息失败，请检查网络配置\n{ex.msg}")


async def get_type_id(event):
    return event.group_id if isinstance(event, GroupMessageEvent) else event.user_id


def on_startup():
    if not Path(get_path()).is_dir():
        Path(get_path()).mkdir(parents=True)


def get_timespan(time_str):
    """字符串转时间戳"""
    time_array = time.strptime(time_str, "%Y-%m-%d %H:%M:%S")
    res = int(time.mktime(time_array))
    return res


def get_time_difference(live_time: int, now: int):
    """计算开播时间到当前时间的时间差"""
    sub = now - live_time
    m, s = divmod(sub, 60)
    h, m = divmod(m, 60)
    dt = ("%02d:%02d:%02d" % (h, m, s))
    return dt
