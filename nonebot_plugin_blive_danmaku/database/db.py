from nonebot import get_driver
from nonebot.log import logger
from tortoise import Tortoise
from tortoise.connection import connections

from ..utils import get_path
from .model import Sub, LiveRoom, Danmaku
from aerich import Command
from nonebot_plugin_blive_danmaku import __version__

sub_dict = {"street_lamp": [], "live": []}

class Db:
    @classmethod
    async def init(cls):
        config={
            "connections":{"danmaku_bot":f"sqlite://{get_path('danmakuBot.sqlite3')}"},
            "apps":{
                __version__ :{
                    "models":["aerich.models","nonebot_plugin_blive_danmaku.database.model"],
                    "default_connection":"danmaku_bot"
                }
            }
        }
        try:
            command = Command(tortoise_config=config, app=__version__)
            await command.init()
            await command.init_db(True)
            await command.migrate()
            await command.upgrade()
        except Exception as ex:
            logger.debug(f"migrate error:\n{ex}")
        await Tortoise.init(config=config)
        await Tortoise.generate_schemas()
        await cls.update_sub_list()
        logger.info("load db")
        
    
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
        sub_dict["live"] = list(set([x.uid async for x in subs]))
    
    @classmethod
    async def get_rooms(cls, **kwargs):
        res = await LiveRoom.get(**kwargs)
        return res
    
    @classmethod
    async def get_rooms_by_paged(cls, limit, offset, where):
        conn = Tortoise.get_connection("danmaku_bot")
        _,rows = await conn.execute_query(f"""select * from 
                                                        (select distinct room.*
                                                            from LiveRoom room 
                                                            left join Sub s on s.uid=room.uid
                                                            left join danmaku d on room.id = d.room_id
                                                            where {where} 
                                                            )t
                                                            order by start_time desc
                                                            limit ? offset ?""",[limit,offset])
        _,dict = await conn.execute_query(f"""select count(distinct id) total from 
                                                (select room.*,s.type,s.type_id,d.message 
                                                from LiveRoom room 
                                                    left join Sub s on s.uid=room.uid
                                                    left join danmaku d on room.id = d.room_id
                                                 where {where}
                                                )t""")
        total = dict[0]["total"]
        return total,rows

    @classmethod
    async def get_room(cls, **kwargs):
        res = await LiveRoom.get(**kwargs).first()
        return res
    
    @classmethod
    async def get_danmaku_by_rid(cls, room_id):
        res = await Danmaku.get(room_id=room_id).order_by("create_time")
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
