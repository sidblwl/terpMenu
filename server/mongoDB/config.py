from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
import certifi

# Username: admin
# Password: jw4210

uri = "mongodb+srv://admin:jw4210@menuapp.bqkl1kv.mongodb.net/?appName=menuApp"
# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())

db = client.menu_application
reviews_collection = db["reviews"]
menuItems_collection = db["menuItems"]