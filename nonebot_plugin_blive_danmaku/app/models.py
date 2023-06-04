from pydantic import BaseModel
from typing import Dict, Any
from typing import Optional

class ResponseItem(BaseModel):
    code: int
    msg: Optional[str]
    data: Optional[Dict[str, Any]]
