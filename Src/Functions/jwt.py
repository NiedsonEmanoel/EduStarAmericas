import jwt
from datetime import datetime, timedelta, timezone
from pydantic import validate_call
import bcrypt

key: str = 'secret'

@validate_call
def hashString(product: str) -> str:
    product_bytes = product.encode('utf-8')
    hashed_product = bcrypt.hashpw(product_bytes, bcrypt.gensalt())
    return hashed_product.decode('utf-8')

@validate_call
def compareHashPass(password: str, hashed:str) -> bool:
    try:
        password_hashed = password.encode('utf-8')
        hashed_hash = hashed.encode('utf-8')

        if bcrypt.hashpw(password_hashed, hashed_hash) == hashed_hash:
            return True
        else:
            return False
    except Exception:
        return False

@validate_call
def encodeLogin(payload: dict[str, str]) -> str:
    """
    Recebe um payload com as informações do usuário e cria um webToken assinado digitalmente com validade de
    dois dias (48h) para o grupo de aud: user
    """    
    jwt_payload = jwt.encode({
        "exp": datetime.now(timezone.utc) + timedelta(days=2),
        "nbf": datetime.now(timezone.utc),
        "aud": "user",
        'user': payload
        }, key, algorithm='HS256')
    return jwt_payload

@validate_call
def encodeAdm(payload: dict[str, str]) -> str:
    """
    Recebe um payload com as informações do usuário e cria um webToken de ADM assinado digitalmente com validade de
    2h para o grupo de aud: adm
    """    
    jwt_payload = jwt.encode({
        "exp": datetime.now(timezone.utc) + timedelta(hours=2),
        "nbf": datetime.now(timezone.utc),
        "aud": "adm",
        'user': payload
        }, key, algorithm='HS256')
    return jwt_payload

@validate_call
def decodeLogin(token: str) -> dict:
    """
    Decodifica o token e atoriza ou nega a passagem.
    """ 
    try:
        decoded = jwt.decode(token, key=key, algorithms=['HS256'], audience=['user', 'adm'])
        product = {
            'pass': True,
            'decoded': decoded
        }
        return product
    except Exception as ext:
        product = {
            'pass': False,
            'decoded': None
        }
        return product