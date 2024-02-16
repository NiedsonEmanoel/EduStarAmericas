from fastapi import FastAPI
from typing import Annotated
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from Middlewares import authVerification

app = FastAPI(
    title='Enemaster.app',
    version='1.05',
    docs_url='/api/docs'
)

app.add_middleware(
    CORSMiddleware,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True,
    allow_origins=['*']
)

app.middleware('http')(authVerification.verifyLogin)
app.middleware('http')(authVerification.verifyAuth)
app.middleware('http')(authVerification.toHomeIfLogged)

templates = Jinja2Templates(directory="./Views/Front/build")
app.mount('/static', StaticFiles(directory="./Views/Front/build/static"), 'static')

@app.get("/items/{item_id}")
async def read_items(item_id: int):
    return {"item_id": item_id}

async def health():
    return { 'status': 200 }

app.get('/api/health')(health)


@app.get("/{rest_of_path:path}")
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse('index.html', { 'request': req })

