from fastapi import APIRouter
from Controllers import users

userRouter = APIRouter(
    prefix='/users',
    tags=['Users']
)

userRouter.post('/login')(users.login)
