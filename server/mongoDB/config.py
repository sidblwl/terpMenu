from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Username: admin
# Password: jw4210

uri = "mongodb+srv://admin:jw4210@menuapp.bqkl1kv.mongodb.net/?appName=menuApp"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.menu_application
collection_name = db["reviews"]