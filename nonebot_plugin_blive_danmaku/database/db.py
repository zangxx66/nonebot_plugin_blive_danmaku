from nonebot import get_driver
from nonebot.log import logger
from tortoise import Tortoise
from tortoise.connection import connections

from ..utils import get_path
from .model import Sub, LiveRoom, Danmaku, Gift, ignore_none
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
        
        await Tortoise.init(config=config) # type:ignore
        await Tortoise.generate_schemas() # type:ignore
        await cls.migrate()
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
        conn = Tortoise.get_connection("danmaku_bot") # type:ignore
        _,rows = await conn.execute_query(f"""select * from 
                                                        (select distinct room.*,(select count(1) from danmaku a where a.room_id=room.id and (a.type is null or a.type='street_lamp')) count
                                                            from LiveRoom room 
                                                            left join Sub s on s.uid=room.uid
                                                            left join danmaku d on room.id = d.room_id and (d.type is null or d.type='street_lamp')
                                                            where {where} 
                                                            )t
                                                            order by start_time desc
                                                            limit ? offset ?""",[limit,offset])
        _,dict = await conn.execute_query(f"""select count(distinct id) total from 
                                                (select room.*,s.type,s.type_id,d.message 
                                                from LiveRoom room 
                                                    left join Sub s on s.uid=room.uid
                                                    left join danmaku d on room.id = d.room_id and (d.type is null or d.type='street_lamp')
                                                 where {where}
                                                )t""")
        total = dict[0]["total"]
        return total,rows

    @classmethod
    async def get_room(cls, **kwargs):
        res = await LiveRoom.get(**kwargs).first()
        return res
    
    @classmethod
    async def get_room_info(cls, id: int):
        conn = Tortoise.get_connection("danmaku_bot") # type:ignore
        _,query = await conn.execute_query("""
                                        select room.*,s.statistics
                                        from liveroom room
                                        left join sub s on s.uid=room.uid
                                        where
                                            room.id=?
        """, [id])
        res = query[0]
        return res
    
    @classmethod
    async def get_danmaku_by_rid(cls, room_id, type):
        conn = Tortoise.get_connection("danmaku_bot") # type:ignore
        _,res = await conn.execute_query("""
                                                select d.id,d.create_time,d.live_duration,d.uname,d.message,d.type,'0' num,'' price, '' guard, '' uid
                                                from danmaku d
                                                where
                                                    d.room_id=?
                                                and (d.type='street_lamp' or d.type is null)
                                                union
                                                select g.id,g.create_time,g.live_duration,g.uname,g.name,g.type,g.num,g.price,g.guard,g.uid
                                                from gift g
                                                where
                                                    g.rid=?
                                                and g.type='sc'
                                                order by live_duration
        """,[room_id,room_id])
        # res = await Danmaku.get(**ignore_none(room_id=room_id,type__contains=type)).order_by("create_time")
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
    
    @classmethod
    async def add_gift(cls, **kwargs):
        res = await Gift.add(**kwargs)
        return res
    
    @classmethod
    async def get_gift_count(cls, room_id):
        res = await Gift.get(rid=room_id).count()
        return res
    
    @classmethod
    async def get_gift_by_paged(cls, room_id, page, size, keyword, type):
        kwargs = {
            "rid": room_id,
            "name__contains": keyword,
            "type": type
        }

        res = await Gift.get(**ignore_none(**kwargs)).limit(size).offset(page).order_by("create_time")
        return res
    
    @classmethod
    async def get_statistics(cls, room_id):
        conn = Tortoise.get_connection("danmaku_bot") # type:ignore
        _,dict = await conn.execute_query("""select round(count(d.id)/((room.end_time-room.start_time)/60)) avg,
                                           count(d.id) danmaku_total,
                                           room.watch_person  
                                           from liveroom room 
                                           left join danmaku d on d.room_id=room.id 
                                           where room.id=?""", [room_id])
        avg_min_danmaku = dict[0]["avg"]
        danmaku_total = dict[0]["danmaku_total"]
        watched = dict[0]["watch_person"]
        _,hot_word = await conn.execute_query("""select message,count(1) sum from danmaku where room_id=? group by message order by count(1) desc limit 10""",[room_id])
        _,min_danmaku = await conn.execute_query("""select create_time, live_duration, count(create_time) as sum, 
                                                    datetime(strftime('%s',create_time)/60*60, 'unixepoch') as countTime 
                                                    from danmaku
                                                    where room_id=?
                                                    group by strftime('%s', countTime)
                                                    order by countTime""", [room_id])
        result = {
            "avg_danmaku": avg_min_danmaku,
            "total": danmaku_total,
            "hot_word": hot_word,
            "min_danmaku": min_danmaku,
            "watched": watched
        }
        return result
    
    @classmethod
    async def migrate(cls):
        conn = Tortoise.get_connection("danmaku_bot") # type:ignore
        # v0.3.0
        _,type = await conn.execute_query("select count(1) Total from sqlite_master where name='danmaku' and sql like '%type%'")
        total = type[0]["Total"]
        if total == 0:
            _,res = await conn.execute_query("alter table danmaku add column type varchar(50)")
        _,watch = await conn.execute_query("select count(1) Total from sqlite_master where name='liveroom' and sql like '%watch_person%'")
        watch_field = watch[0]["Total"]
        if watch_field == 0:
            _,res = await conn.execute_query("alter table liveroom add column watch_person bigint")
        _,statistics = await conn.execute_query("select count(1) Total from sqlite_master where name='sub' and sql like '%statistics%'")
        statistics_field = statistics[0]["Total"]
        if statistics_field == 0:
            _,res = await conn.execute_query("alter table sub add column statistics int default 0 not null")


get_driver().on_startup(Db.init)
get_driver().on_shutdown(connections.close_all)
