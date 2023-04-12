from nonebot import get_driver
from nonebot.log import logger
from tortoise import Tortoise
from tortoise.connection import connections

from ..utils import get_path
from .model import Sub, LiveRoom, Danmaku
from aerich import Command

sub_dict = {"street_lamp": [], "live": []}

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
        try:
            command = Command(tortoise_config=config)
            await command.init()
            await command.migrate("danmakuBot")
        except:
            logger.debug("migrate error")
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
    def get_sub_list(cls, key):
        return sub_dict[key]
 
    @classmethod
    async def update_sub_list(cls):
        subs = Sub.all()
        sub_dict["street_lamp"] = list(set([sub.uid async for sub in subs if sub.street_lamp]))
        sub_dict["live"] = list(set([sub.uid async for sub in subs]))
    
    @classmethod
    async def get_rooms(cls, **kwargs):
        res = await LiveRoom.get(**kwargs)
        return res
    
    @classmethod
    async def get_room(cls, **kwargs):
        res = await LiveRoom.get(**kwargs).first()
        return res
    
    @classmethod
    async def get_danmaku_by_rid(cls, room_id):
        res = await Danmaku.get(room_id=room_id).order_by("-create_time")
        return res
    
    @classmethod
    async def add_room(cls, **kwargs):
        res = await LiveRoom.add(**kwargs)
        return res
    
    @classmethod
    async def update_room(cls, conf, switch, **kwargs):
        res = await LiveRoom.update(kwargs, **{conf: switch})
        return res
    
    @classmethod
    async def add_danmaku(cls, **kwargs):
        res = await Danmaku.add(**kwargs)
        return res


get_driver().on_startup(Db.init)
get_driver().on_shutdown(connections.close_all)
