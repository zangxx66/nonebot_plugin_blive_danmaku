from pydantic import BaseModel
from typing import Dict, Any

class ResponseItem(BaseModel):
    code: int
    msg: str
    data: Dict[str, Any] = {}
