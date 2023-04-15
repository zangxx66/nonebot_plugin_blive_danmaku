from pydantic import BaseModel, Field
from typing import Optional
from nonebot import get_driver

class Config(BaseModel):
    danmaku_group_notice: Optional[bool] = Field(False, alias="danmaku_group_notice")

driver = get_driver()
driver_config = driver.config
danmaku_config = Config.parse_obj(driver_config.dict())
