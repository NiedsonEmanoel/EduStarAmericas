from pydantic import BaseModel, EmailStr, Field

class userAuth(BaseModel):
    email: EmailStr = Field(default='example@email.com') 
    password: str = Field(default='trypassword')