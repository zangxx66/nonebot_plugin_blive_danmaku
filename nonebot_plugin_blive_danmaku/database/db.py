from nonebot import get_driver
from tortoise import Tortoise
from tortoise.connection import connections

from ..utils import get_path
from .model import Sub
from nonebot.log import logger

sub_dict = {"list":[]}

class Db:
    @classmethod
    async def init(cls):
        config={
            "connections":{"danmaku_bot":f"sqlite://{get_path('danmakuBot.sqlite3')}"},
            "apps":{
                "danmaku_bot_app":{
                    "models":["nonebot_plugin_blive_danmaku.database.model"],
                    "default_connection":"danmaku_bot"
                }
            }
        }
        await Tortoise.init(config=config)
        await Tortoise.generate_schemas()
        await cls.update_sub_list()
    
    @classmethod
    async def add_sub(cls, **kwargs) -> bool:
        if not await Sub.add(**kwargs):
            return False
        await cls.update_sub_list()
        return True
    
    @classmethod
    async def delete_sub(cls, **kwargs) -> bool:
        if not await Sub.delete(**kwargs):
            return False
        await cls.update_sub_list()
        return True
    
    @classmethod
    async def update_sub(cls, conf, switch, **kwargs):
        res = await Sub.update(kwargs, **{conf: switch})
        if res:
            await cls.update_sub_list()
        return res
    
    @classmethod
    async def get_subs(cls, **kwargs):
        res = await Sub.get(**kwargs)
        return res

    @classmethod
    async def get_sub(cls, **kwargs):
        res = await Sub.get(**kwargs).first()
        return res

    @classmethod
    def get_sub_list(cls):
        return sub_dict["list"]

    @classmethod
    async def update_sub_list(cls):
        subs = Sub.all()
        sub_dict["list"] = list(set([sub.uid async for sub in subs if sub.street_lamp]))


get_driver().on_startup(Db.init)
get_driver().on_shutdown(connections.close_all)
