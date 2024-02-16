from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.responses import RedirectResponse
frontProtected = [
   '/home'
]


protectedLoginPaths = [
    '/api/health'
]


confidentialAuthPaths = [
    '/api/docs',
    "/items/"
]

frontConfidential = [
    
]

protectedLoginPaths.extend(frontProtected)
confidentialAuthPaths.extend(frontConfidential)
protectedLoginPaths.extend(confidentialAuthPaths)


async def verifyLogin(request: Request, call_next): ###SITUAÇÃO NORMAL DE LOGIN E AUTORIZAÇÃO DE ROTA, VERIFICA APENAS O TOKEN JWT (48h)
    path = str(request.url.path).lower()
    print(path)
    # Verifique se o caminho da URL está na lista de rotas protegidas
    if any(path.startswith(p) for p in protectedLoginPaths):
        if 1 == 1:  # Simulação de login
            print(path)
            response = await call_next(request)
            return response
        else:
            if any(path.startswith(p) for p in frontProtected): ##PROTEÇÃO DE FRONT
                return RedirectResponse(f"{request.base_url}auth/login")
            else:
                return JSONResponse( ##API
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"message": "Não autorizado."}
                )
    else:
        response = await call_next(request)
        return response
    
async def verifyAuth(request: Request, call_next): ## ROTAS ADMINISTRATIVAS DE CONFIDENCIALIDADE: EMITIR JWT DE ADMINISTRADOR (1H)
    path = str(request.url.path).lower()
    if any(path.startswith(p) for p in confidentialAuthPaths):
        if 1 == 1:  # Simulação de autorização
            response = await call_next(request)
            return response
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
        if 1 == 1:  # Simulação de autorização
            return RedirectResponse(f"{request.base_url}home")
        else:
            response = await call_next(request)
            return response
    else:
        response = await call_next(request)
        return response
