from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from .router import router
from nonebot.log import logger
import os
import mimetypes

dist_path = Path(__file__).parent / "frontend"
cache_path = Path(__file__).parent / "cache"

if not dist_path.is_dir():
    raise FileNotFoundError("WebUI path not found")
if not cache_path.is_dir():
    Path.mkdir(cache_path)

app = FastAPI(title="nonebot_plugin_blive_danmaku", description="live room danmaku manager", version="0.2.0", docs_url=None, redoc_url=None, openapi_url=None)

@app.exception_handler(RequestValidationError)
async def exception_handle(request: Request, exc: RequestValidationError):
    logger.error(f"fastapi请求异常：{exc.errors()}")
    return JSONResponse({"code": -1, "msg": exc.errors(), "data": None})


app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(router, prefix="/api")
app.mount("/static", StaticFiles(directory=cache_path), name="static")

templates = Jinja2Templates(directory=dist_path)

@app.get("/")
async def main(request: Request):
    return templates.TemplateResponse("index.html", { "request": request })

@app.get("/icon/favicon.ico")
async def icon():
    icon_file = os.path.join(dist_path, "icon", "favicon.ico")
    if not os.path.exists(icon_file):
        return HTMLResponse(status_code=404)
    return FileResponse(icon_file)

@app.get("/assets/{filename}")
async def assets(filename):
    assets_file = os.path.join(dist_path, "assets", filename)
    if not os.path.exists(assets_file):
        return HTMLResponse(status_code=404)
    with open(assets_file, mode="rt", encoding="utf-8") as f:
        content = f.read()
    mime = mimetypes.guess_type(filename)[0]
    return HTMLResponse(content=content, status_code=200, media_type=mime)
