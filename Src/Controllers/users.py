from fastapi import Request, status, Header, Response
from Models import userModels
from fastapi.responses import JSONResponse
from fastapi.responses import RedirectResponse
from Functions import jwt
from datetime import datetime, timedelta, timezone

async def login(user_info: userModels.userAuth, request: Request, response: Response):
    role = 'adm'
    password = user_info.password,
    
    jwt.compareHashPass(password=password[0], hashed='ssss')
    if 1==1:
        payload = {
        'email' : user_info.email,
        'role': role
        }

        token = jwt.encodeLogin(payload=payload)
        headers = {"Authorization": token}
        response = JSONResponse( ##API
                        status_code=status.HTTP_200_OK,
                        content={
                            "user": {
                                'email': payload['email'],
                                'role': role,
                                'preferences': [{}],
                                'calendar': [{}]                        
                                },
                            'token': token
                            },
                            headers=headers
                    )
        response.set_cookie(key='Authorization', value=token, httponly=True, expires=datetime.now(timezone.utc) + timedelta(days=2))
        return response
    else:
        response = JSONResponse( ##API
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={
                    'error': 'user or email not found'
                }
            )
