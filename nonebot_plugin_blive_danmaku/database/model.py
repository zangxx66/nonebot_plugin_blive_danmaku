from tortoise.models import Model
from tortoise import fields
from nonebot.log import logger

class BaseModel(Model):
    @classmethod
    def get_(cls, *args, **kwargs):
        super().get(*args, **kwargs)

    @classmethod
    def get(cls, **kwargs):
        return cls.filter(**kwargs)

    @classmethod
    async def add(cls, **kwargs):
        pk_name = cls.describe()["pk_field"]["name"]
        if pk_name == "id" and pk_name not in kwargs:
            filters = kwargs
        else:
            filters = {pk_name: kwargs[pk_name]}
        if await cls.get(**filters).exists():
            return False
        await cls.create(**kwargs)
        return True

    @classmethod
    async def delete(cls, **kwargs):
        query = cls.get(**kwargs)
        if await query.exists():
            await query.delete()
            return True
        return False

    @classmethod
    async def update(cls, q, **kwargs):
        query = cls.get(**q)
        if await query.exists():
            await query.update(**kwargs)
            return True
        logger.error(f'更新数据失败：{q} -> {kwargs}')
        return False

    class Meta:
        abstract = True


class Sub(BaseModel):
    type_id=fields.BigIntField()
    type=fields.CharField(max_length=10)
    uid=fields.BigIntField()
    street_lamp=fields.BooleanField()
    bot_id=fields.BigIntField()


class LiveRoom(BaseModel):
    id=fields.IntField(pk=True, generated=True)
    room_id=fields.BigIntField()
    cover=fields.CharField(max_length=500)
    title=fields.CharField(max_length=50)
    uid=fields.BigIntField()
    name=fields.CharField(max_length=50)
    start_time=fields.BigIntField()
    end_time=fields.BigIntField()


class Danmaku(BaseModel):
    room_id=fields.BigIntField()
    uname=fields.CharField(max_length=50)
    message=fields.CharField(max_length=5000)
    create_time=fields.CharField(max_length=50)
    """创建时间"""
    live_duration=fields.CharField(max_length=50)
    """开播时长"""
