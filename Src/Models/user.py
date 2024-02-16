from pydantic import BaseModel


class User(BaseModel):
    email:str
    name:str
    password:float
    note_lc:float
    note_mt:float
    note_ch:float
    note_cn:float
