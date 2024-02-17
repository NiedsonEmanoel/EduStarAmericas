from fastapi import APIRouter
from Controllers import api

router = APIRouter(
    prefix='/api',
    tags=['API']
)
router.post('/login')(api.login)

router.get('/health')(api.health)
router.get("/items/{item_id}", deprecated=True)(api.test_param)
