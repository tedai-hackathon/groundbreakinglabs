from flask import Flask
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    # Create a new client and connect to the server
    client = MongoClient(os.getenv('MONGODB_URI'), server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        return "Pinged your deployment. You successfully connected to MongoDB!"
    except Exception as e:
        return e