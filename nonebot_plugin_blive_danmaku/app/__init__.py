from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from .router import router
from nonebot.log import logger


dist_path = Path(__file__).parent / "frontend"
cache_path = Path(__file__).parent / "frontend" / "static"

if not dist_path.is_dir():
    raise FileNotFoundError("WebUI path not found")
if not cache_path.is_dir():
    Path.mkdir(cache_path)

app = FastAPI(title = "nonebot_plugin_blive_danmaku", 
              description = "live room danmaku manager", 
              version = "0.2.0", 
              docs_url = None, 
              redoc_url = None, 
              openapi_url = None)


@app.exception_handler(RequestValidationError)
async def exception_handle(request: Request, exc: RequestValidationError):
    logger.error(f"fastapi请求异常：{exc.errors()}")
    return JSONResponse(status_code=418, content={"code": -1, "msg": "请求异常", "data": exc.errors()})


app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(router, prefix="/api")
app.mount("/", StaticFiles(directory=dist_path, html=True), name="main")

templates = Jinja2Templates(directory=dist_path)


@app.get("/")
async def main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
