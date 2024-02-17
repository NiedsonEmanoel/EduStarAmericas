from fastapi import Request, status, Header, Response
from Models import requestsModels
from fastapi.responses import JSONResponse
from fastapi.responses import RedirectResponse
from Functions import jwt

async def health():
    return { 'status': 200 }

async def test_param(item_id: int):
    return {"item_id": item_id}

async def login(user_info: requestsModels.userAuth, request: Request, response: Response):
    payload = {
    'email' : user_info.email,
    'password' : user_info.password
    }

    token = jwt.encodeLogin(payload=payload)

    return JSONResponse( ##API
                    status_code=status.HTTP_200_OK,
                    content={
                        "user": {
                            'email': payload['email'],
                        },
                        'token': token
                        }
                )
