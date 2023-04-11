from pathlib import Path
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from .router import router


dist_path = Path(__file__).parent / "frontend"

if not dist_path.is_dir():
    raise FileNotFoundError("WebUI path not found")

app = FastAPI(title="nonebot_plugin_blive_danmaku", description="live room danmaku manager", dependencies=([]), version="0.2.0")
app.add_middleware(GZipMiddleware, minimum_size=1024)
app.include_router(router, prefix="/api")
app.mount("/", StaticFiles(directory=dist_path, html=True), name="frontend")
