import bcrypt
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator, AfterValidator
import datetime
from bson import ObjectId
from pymongo import ReturnDocument
from typing_extensions import Annotated
from Functions import jwt

PyObjectId = Annotated[str, BeforeValidator(str)]
PassType = Annotated[str, AfterValidator(lambda v: jwt.hashString(v))]

class userModel(BaseModel):
    id: PyObjectId | None = Field(alias='_id', default=None)
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: PassType = Field(...)
    studydays: list[datetime.date] = Field(default=[])
    active: bool = Field(default=True)
    role: str = Field(default='user')
    currentPlan: dict = Field(default={})
    
    events: list[dict[str, str | datetime.datetime]] = Field(default=[])
    lcNotes: list[dict[str, float | datetime.date | int]] = Field(default=[])
    chNotes: list[dict[str, float | datetime.date | int]] = Field(default=[])
    cnNotes: list[dict[str, float | datetime.date | int]] = Field(default=[])
    mtNotes: list[dict[str, float | datetime.date | int]] = Field(default=[])
    redactionNotes: list[dict[str, int | datetime.time]] = Field(default=[])
    habsMoreTrue: dict[int|str, int] = Field(default={numero: 0 for numero in range(1, 32)})
    cards: list[dict[str, int | float | datetime.datetime]] = Field(default=[])
    preferences: dict = Field(default={})
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            'example': {
                "name": "John Doe",
                "email": "johndoe@example.com",
                "password": "hashed_password",
                "studydays": ["2024-02-20", "2024-02-21"],
                "active": True,
                "role": "user",
                "currentPlan": {"plan_name": "tri+", "plan_duration": 30},
                "events": [
                    {"event_name": "Meeting", "event_time": "2024-02-22T10:00:00"},
                    {"event_name": "Presentation", "event_time": "2024-02-23T14:00:00"}
                ],
                "lcNotes": [
                    {'name_prove':'LC_2020_ENGLISH',"corrects": 36, "note_value": 622, "note_date": "2024-02-20", 'questions': []},
                ],
                "chNotes": [
                    {'name_prove':'CH_2020',"corrects": 36, "note_value": 622, "note_date": "2024-02-20", 'questions': []},
                ],
                "cnNotes": [
                    {'name_prove':'CN_2020',"corrects": 36, "note_value": 622, "note_date": "2024-02-20", 'questions': []},

                ],
                "mtNotes": [
                    {'name_prove':'MT_2020',"corrects": 36, "note_value": 622, "note_date": "2024-02-20", 'questions': []},
                ],
                'cards': [
                    {
                        'htmlbody': 'clear',

                        'due': "2024-02-23T14:00:00",
                        'stability': 5.8,
                        'difficulty': 3.9899999999999998,
                        'elapsed_days': 0,
                        'scheduled_days': 6,
                        'reps': 1,
                        'lapses': 0,
                        'state': 2, #0 novo, 1 aprendendo, 2 revisando, 3 reaprendendo
                        'last_review': "2024-02-23T14:00:00"
                    }
                ],
                "redactionNotes": [
                    {"note_content": "In reprehenderit in voluptate", "note_value": 200, "note_time": "12:00:00"},
                    {"note_content": "Excepteur sint occaecat", "note_value": 404, "note_time": "15:30:00"}
                ],
                "preferences": {
                    "theme": "dark",
                    "language": "en",
                    "timezone": "UTC"
                }
        }
        }
    )


class userAuth(BaseModel):
    email: EmailStr = Field(default='example@email.com') 
    password: str = Field(default='trypassword')