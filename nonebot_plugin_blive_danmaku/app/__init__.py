from pathlib import Path
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from .router import router
from nonebot.log import logger


dist_path = Path(__file__).parent / "frontend"

if not dist_path.is_dir():
    raise FileNotFoundError("WebUI path not found")

app = FastAPI(title="nonebot_plugin_blive_danmaku", description="live room danmaku manager", dependencies=([]), version="0.2.0")

@app.exception_handler(RequestValidationError)
async def exception_handle(request: Request, exc: RequestValidationError):
    logger.error(f"fastapi请求异常：{exc.errors()}")
    return JSONResponse({"code": -1, "msg": exc.errors(), "data": None})


app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(router, prefix="/api")
app.mount("/", StaticFiles(directory=dist_path, html=True), name="frontend")