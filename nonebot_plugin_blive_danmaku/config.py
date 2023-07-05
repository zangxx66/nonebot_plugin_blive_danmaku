from pydantic import BaseModel, Field
from typing import Optional
from nonebot import get_driver


class Config(BaseModel):
    # 全局群开播提醒
    danmaku_group_notice: Optional[bool] = Field(False, alias="danmaku_group_notice")
    # 外部访问地址
    danmaku_host: Optional[str] = Field(None, alias="danmaku_host")


driver = get_driver()
driver_config = driver.config
danmaku_config = Config.parse_obj(driver_config.dict())
