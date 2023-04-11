from fastapi import APIRouter
from ..database import Db as db
from . import models

router = APIRouter(tags=["api"])

@router.get("/list/{type}/{type_id}", response_model=models.ResponseItem)
async def get_type_sub_list(type:str, type_id: int):
    sub_list = await db.get_subs(type=type, type_id=type_id)
    room_list = []
    for sub in sub_list:
        room = await db.get_room(uid=sub.uid)
        if not room:
            continue
        room_list.append(room)
    return models.ResponseItem(code=0, msg="", data={"rows": room_list})

@router.get("/room/{room_id}", response_model=models.ResponseItem)
async def get_room_info(room_id: int):
    room_info = await db.get_room(room_id=room_id)
    if not room_info:
        return models.ResponseItem(code=-1, msg="房间号码有误", data=None)
    danmaku_list = await db.get_danmaku_by_rid(room_id=room_id)
    return models.ResponseItem(code=0, msg="", data={"room_indo": room_info, "danmaku": danmaku_list})
