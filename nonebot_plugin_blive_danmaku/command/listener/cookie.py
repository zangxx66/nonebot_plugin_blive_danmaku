from ...database import Db as db
from nonebot.adapters.onebot.v11.event import MessageEvent
from nonebot.params import ArgPlainText
from nonebot import on_command
from ...utils import cookie_check, handle_cookie


cookie_cmd = on_command("导入cookie", priority=5)
cookie_cmd.__doc__ = """导入cookie 已登录账号的cookie"""
cookie_cmd.handle()(handle_cookie)
cookie_cmd.got("cookie", prompt="请输入cookie")(cookie_check)


@cookie_cmd.handle()
async def _(event: MessageEvent, cookie: str = ArgPlainText("cookie")):
    """
    导入一个cookie
    """
    res = await db.add_cookie(cookie)
    if res:
        await cookie_cmd.finish("添加cookie成功")
    else:
        await cookie_cmd.finish("添加cookie失败，可能该cookie已存在")
