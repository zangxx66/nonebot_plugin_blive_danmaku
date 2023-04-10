from pydantic import BaseModel, validator

class Config(BaseModel):
    danmaku_group_notice: bool = False

    @validator("danmaku_group_notice")
    def check_config(cls, v):
        if isinstance(v, bool):
            return v
        return False
