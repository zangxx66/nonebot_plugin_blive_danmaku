from fastapi import APIRouter, Query
from ..database import Db as db
from . import models
from nonebot.log import logger
import httpx
from io import BytesIO
import os
from PIL import Image

router = APIRouter(tags=["api"])
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}
current_path = os.path.abspath(__file__)
res_dir = os.path.abspath(os.path.dirname(current_path) + os.path.sep + ".")
full_path = os.path.abspath(os.path.join(res_dir, 'cache'))


@router.get("/get_sub_list", response_model=models.ResponseItem)
async def get_type_sub_list(type:str = Query(..., max_length=50), type_id: int = Query(...), page:int = Query(1), size:int = Query(30)):
    sub_list = await db.get_subs(type=type, type_id=type_id)
    room_list = []
    for sub in sub_list:
        room = await db.get_rooms(uid=sub.uid)
        if not room:
            continue
        room_list.extend(room)
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

@router.get("/get_cover", response_model=models.ResponseItem)
async def get_cover(url:str=Query(...)):
    try:
        async with httpx.AsyncClient() as client:
            rep = await client.get(url, headers=headers)
            assert rep.status_code == 200
    except Exception as ex:
        logger.error(f"获取直播间封面异常：\n{ex}")
        return models.ResponseItem(code=-1,msg="请求异常", data=None)
    filename = os.path.basename(url)
    save_path = os.path.join(full_path, filename)
    if os.path.isfile(save_path):
        return models.ResponseItem(code=0,msg="", data={"data": f"/static/{filename}"})
    img = Image.open(BytesIO(rep.content))
    img.save(save_path)
    return models.ResponseItem(code=0,msg="", data={"data": f"/static/{filename}"})
