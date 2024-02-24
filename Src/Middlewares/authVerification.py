from fastapi import Request, status, Header
from fastapi.responses import JSONResponse
from fastapi.responses import RedirectResponse
from Functions import jwt

frontProtected: list[str] = [ #PRECISA DE LOGIN FRONT
   '/home'
]


protectedLoginPaths: list[str] = [ #PRECISA DE LOGIN API
    '/api/health'
]


confidentialAuthPaths: list[str] = [ #APENAS ADM API
    '/api/docs',
    "/items/", #/items/{item_id}
]

frontConfidential: list[str] = [ #APENAS ADM (/ADMIN/QUALQUERCOISA) FRONT
    '/admin/'
]


protectedLoginPaths.extend(frontProtected)

confidentialAuthPaths.extend(frontConfidential)

protectedLoginPaths.extend(confidentialAuthPaths)

async def verifyLogin(request: Request, call_next): ###SITUAÇÃO NORMAL DE LOGIN E AUTORIZAÇÃO DE ROTA, VERIFICA APENAS O TOKEN JWT (48h)
    path = str(request.url.path).lower()
    # Verifique se o caminho da URL está na lista de rotas protegidas
    if any(path.startswith(p) for p in protectedLoginPaths):
        proceed = False
        product = {}
        try:
            token = request.headers['Authorization']
        except:
            token = request.cookies.get('Authorization')
        if (token != None):
            product = jwt.decodeLogin(token)
            proceed = product['pass']
        else:
            proceed = False

        if proceed == True: 
            response = await call_next(request)
            return response
        else:
            if any(path.startswith(p) for p in frontProtected): ##PROTEÇÃO DE FRONT
                return RedirectResponse(f"{request.base_url}auth/login")
            else:
                return JSONResponse( ##API
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"message": "Não autorizado."},
                    
                )
    else:
        response = await call_next(request)
        return response
    
async def verifyAuth(request: Request, call_next): ## ROTAS ADMINISTRATIVAS DE CONFIDENCIALIDADE: EMITIR JWT DE ADMINISTRADOR (2H)
    path = str(request.url.path).lower()
    if any(path.startswith(p) for p in confidentialAuthPaths):
        if 1 == 1:  # Simulação de autorização #CRIAÇÃO JWT DE 1H PARA ROTINAS ADMINISTRATIVAS
            response = await call_next(request)
            return response
        else:
            #DESTRUIR DADOS DE ACESSO 

            if any(path.startswith(p) for p in frontConfidential): ##PROTEÇÃO DE FRONT
                return RedirectResponse(f"{request.base_url}auth/login") 
            else:
                return JSONResponse( 
                    status_code=status.HTTP_403_FORBIDDEN,
                    content={"message": "Sem autorização para acessar esse conteúdo."}
                )
    else:
        response = await call_next(request)
        return response

async def toHomeIfLogged(request: Request, call_next): #VE O JWT/COOKIE E DECIDE SE PASSA PARA LANDING PAGE OU PARA HOME 
    path = str(request.url.path).lower()
    if path == '/':
        if 1 == 2:  # Simulação de autorização
            return RedirectResponse(f"{request.base_url}home")
        else:
            response = await call_next(request)
            return response
    else:
        response = await call_next(request)
        return response
