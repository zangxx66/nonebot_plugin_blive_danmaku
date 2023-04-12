from fastapi import APIRouter, Query
from ..database import Db as db
from . import models

router = APIRouter(tags=["api"])

@router.get("/get_sub_list", response_model=models.ResponseItem)
async def get_type_sub_list(type:str = Query(..., max_length=50), type_id: int = Query(...), page:int = Query(1), size:int = Query(30)):
    sub_list = await db.get_subs(type=type, type_id=type_id)
    room_list = []
    for sub in sub_list:
        room = await db.get_room(uid=sub.uid)
        if not room:
            continue
        room_list.append(room)
    total = len(room_list)
    room_list.sort(key=lambda x:x.start_time, reverse=True)
    start = (page - 1) * size
    end = page * size
    result = room_list[start:end]
    return models.ResponseItem(code=0, msg="", data={"rows": result, "total": total})

@router.get("/get_room", response_model=models.ResponseItem)
async def get_room_info(room_id: int = Query(...)):
    room_info = await db.get_room(room_id=room_id)
    if not room_info:
        return models.ResponseItem(code=-1, msg="房间号码有误", data=None)
    danmaku_list = await db.get_danmaku_by_rid(room_id=room_id)
    return models.ResponseItem(code=0, msg="", data={"room_info": room_info, "danmaku": danmaku_list})
