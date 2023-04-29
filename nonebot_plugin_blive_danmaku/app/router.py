from fastapi import APIRouter, Query
from ..database import Db as db
from . import models
from nonebot.log import logger
import httpx
from io import BytesIO
import os
from PIL import Image
from nonebot import get_driver
from ..config import danmaku_config
from pathlib import Path

router = APIRouter(tags=["api"])
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}
full_path = Path(__file__).parent / "frontend" / "static"
driver = get_driver()
host = danmaku_config.danmaku_host if danmaku_config.danmaku_host else f"http://{driver.config.host}:{driver.config.port}"


@router.get("/get_sub_list", response_model=models.ResponseItem)
async def get_type_sub_list(type:str = Query(..., max_length=50), 
                            type_id: int = Query(...), 
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
    where += f"and type='{type}' "
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
    total,dict = await db.get_rooms_by_paged(size, skip, where)
    return models.ResponseItem(code=0, msg="", data={"rows": dict, "total": total})

@router.get("/get_room", response_model=models.ResponseItem)
async def get_room_info(id: int = Query(...)):
    """
    获取直播场次信息
    """
    room_info = await db.get_room(id=id)
    if not room_info:
        return models.ResponseItem(code=-1, msg="房间号码有误", data=None)
    return models.ResponseItem(code=0, msg="", data={"room_info": room_info})

@router.get("/get_room_danmaku", response_model=models.ResponseItem)
async def get_room_danmaku(rid: int = Query(...)):
    """
    获取直播弹幕
    """
    danmaku_list = await db.get_danmaku_by_rid(room_id=rid)
    return models.ResponseItem(code=0, msg="", data={"rows": danmaku_list, "total": len(danmaku_list)})

@router.get("/get_cover", response_model=models.ResponseItem)
async def get_cover(url:str=Query(...), rid:int=Query(...)):
    """
    啊B有防盗链，这里直接存本地当作缓存用了
    """
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
        await db.update_room("cover", f'{host}/danmaku/static/{filename}', id=rid)
        return models.ResponseItem(code=0,msg="", data={"data": f"/static/{filename}"})
    img = Image.open(BytesIO(rep.content))
    img.save(save_path)
    await db.update_room("cover", f'{host}/danmaku/static/{filename}', id=rid)
    return models.ResponseItem(code=0,msg="", data={"data": f"/static/{filename}"})
