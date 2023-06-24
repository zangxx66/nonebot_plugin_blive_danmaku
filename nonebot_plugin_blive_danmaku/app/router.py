from fastapi import APIRouter, Query
from ..database import Db as db
from . import models
import os
from pathlib import Path
from bilireq.grpc.dynamic import grpc_get_user_dynamics

router = APIRouter(tags=["api"])
full_path = Path(__file__).parent / "frontend" / "static"


@router.get("/get_sub_list", response_model=models.ResponseItem)
async def get_type_sub_list(type:str = Query(..., max_length=50), 
                            type_id: int = Query(...), 
                            uid: int = Query(None),
                            page:int = Query(1), 
                            size:int = Query(30), 
                            title: str= Query(None), 
                            danmaku: str= Query(None),
                            start:int = Query(None), 
                            end:int = Query(None)):
    """
    获取订阅主播的直播列表
    """
    skip = (page - 1) * size
    where = "1=1 "
    where += f"and s.type='{type}' "
    if type_id > 0:
        where += f"and type_id='{type_id}' "
    if title is not None:
        where += f"and (title like '%{title}%' or name like '%{title}%') "
    if start is not None and start > 0:
        where += f"and start_time>='{start}' "
    if end is not None and end > 0:
        where += f"and (end_time>'0' and end_time<'{end}') "
    if danmaku is not None:
        where += f"and message like '%{danmaku}%' "
    if uid is not None and uid > 0:
        where += f"and room.uid='{uid}' "
    total,dict = await db.get_rooms_by_paged(size, skip, where)
    return models.ResponseItem(code=0, msg="", data={"rows": dict, "total": total})

@router.get("/get_room", response_model=models.ResponseItem)
async def get_room_info(id: int = Query(...)):
    """
    获取直播场次信息
    """
    # room_info = await db.get_room(id=id)
    room_info = await db.get_room_info(id=id)
    if not room_info:
        return models.ResponseItem(code=-1, msg="房间号码有误", data=None)
    return models.ResponseItem(code=0, msg="", data={"room_info": room_info})

@router.get("/get_room_danmaku", response_model=models.ResponseItem)
async def get_room_danmaku(rid: int = Query(...), type: str = Query(None)):
    """
    获取弹幕
    """
    danmaku_list = await db.get_danmaku_by_rid(room_id=rid, type=type)
    return models.ResponseItem(code=0, msg="", data={"rows": danmaku_list, "total": len(danmaku_list)})

@router.get("/get_liver_list", response_model=models.ResponseItem)
async def get_liver_list(type:str=Query(...),type_id=Query(...)):
    """
    获取订阅的主播列表
    """
    subs = await db.get_subs(type=type,type_id=type_id)
    result = []
    for sub in subs:
        dy = (await grpc_get_user_dynamics(sub.uid)).list
        name = dy[0].modules[0].module_author.author.name
        result.append({"name": name, "uid": sub.uid})
    return models.ResponseItem(code=0, msg="", data={"data": result})

@router.get("/clear_cache", response_model=models.ResponseItem)
async def clear_cache(type: str=Query(...), type_id: int=Query(...), uid: int=Query(None)):
    """
    重置封面图片
    """
    subs = await db.get_subs(type=type, type_id=type_id)
    room_list = []
    for sub in subs:
        l = await db.get_rooms(uid=sub.uid)
        room_list.extend(l)
    for room in room_list:
        filename = os.path.basename(room.cover)
        origin_url = "https://i0.hdslb.com/bfs/live/new_room_cover/" + filename
        await db.update_room("cover", origin_url, id=room.id)

        save_path = os.path.join(full_path, filename)
        if os.path.isfile(save_path):
            os.remove(save_path)
    return models.ResponseItem(code=0, msg=None, data=None)

@router.get("/get_liver_name", response_model=models.ResponseItem)
async def get_liver_name(uid: int=Query(...)):
    dy = (await grpc_get_user_dynamics(uid)).list
    name = dy[0].modules[0].module_author.author.name
    return models.ResponseItem(code=0, data={"data": name}, msg=None)

@router.get("/get_gift", response_model=models.ResponseItem)
async def get_gift(rid: int = Query(...), page: int = Query(1), size: int = Query(50), keyword: str = Query(None), type: str = Query(None)):
    """
    获取礼物列表
    """
    total = await db.get_gift_count(room_id=rid)

    skip = (page - 1) * size
    rows = await db.get_gift_by_paged(room_id=rid, page=skip, size=size, keyword=keyword, type=type)
    return models.ResponseItem(code=0, data={"rows": rows, "total": total}, msg=None)

@router.get("/get_statistics", response_model=models.ResponseItem)
async def get_statistics(rid: int = Query(...)):
    """
    获取统计数据
    """
    res = await db.get_statistics(room_id=rid)
    return models.ResponseItem(code=0, data=res, msg=None)
