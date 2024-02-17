import jwt
from datetime import datetime, timedelta, timezone
from pydantic import validate_call

key: str = 'secret'

@validate_call
def encodeLogin(payload: dict[str, str]) -> str:
    jwt_payload = jwt.encode({
        "exp": datetime.now(timezone.utc) + timedelta(seconds=30),
        "nbf": datetime.now(timezone.utc),
        "aud": "user",
        'user': payload
        }, key, algorithm='HS256')
    return jwt_payload

