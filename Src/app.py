import uvicorn

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

from bson import ObjectId

from fastapi.middleware.cors import CORSMiddleware
from Middlewares import authVerification

from Routes import api, tags

app = FastAPI(
    title='Enemaster.app',
    version='1.05',
    summary='Nosso algoritmo identifica as questões e assuntos cruciais para seu estudo. Evite perder tempo revisando áreas já dominadas ou menos relevantes. Concentre-se no que realmente melhorará sua nota TRI.',
    docs_url='/api/docs',
    redoc_url=None,
    openapi_tags=tags.tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_origins=['*']
)


app.middleware('http')(authVerification.verifyLogin)
app.middleware('http')(authVerification.verifyAuth)
app.middleware('http')(authVerification.toHomeIfLogged)

app.include_router(api.router)

templates = Jinja2Templates(directory="./Views/Front/build")
app.mount('/static', StaticFiles(directory="./Views/Front/build/static"), 'static')
@app.get("/{rest_of_path:path}", tags=['Front'])
async def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse('index.html', { 'request': req })

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000, server_header=False, headers=[('server', 'enemaster')])