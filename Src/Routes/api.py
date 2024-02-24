from fastapi import APIRouter
from Controllers import api
from .users import userRouter

router = APIRouter(
    prefix='/api',
    tags=['API']
)

router.include_router(userRouter)

router.get('/health')(api.health)
router.get("/items/{item_id}", deprecated=True)(api.test_param)
