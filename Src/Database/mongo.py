import motor.motor_asyncio
import os

mongoLink = 'mongodb+srv://enemaster:enemaster@cluster0.vpzi6fx.mongodb.net/' #os.environ['MONGO_URL']
client = motor.motor_asyncio.AsyncIOMotorClient(mongoLink)
database = client['enemaster']


