from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
import bsonjs
from bson.json_util import dumps as bson_dumps
from bson.raw_bson import RawBSONDocument
from bson.objectid import ObjectId

load_dotenv()
app = Flask(__name__)

# MongoDB connection setup
client = MongoClient(os.getenv('MONGODB_URI'), server_api=ServerApi('1'), document_class=RawBSONDocument)
coll = client.ted_ai.students

# Define Student data structure
class Student:
    def __init__(self, email, interests, sessions, fname, lname):
        self.email = email
        self.interests = interests
        self.sessions = sessions
        self.fname = fname
        self.lname = lname

# API endpoint to add a new student
@app.route("/api/student/new", methods=["POST"])
def add_student():
    data = request.get_json()
    # email = data.get("email")
    # interests = data.get("interests")
    # sessions = data.get("sessions")
    # fname = data.get("fname")
    # lname = data.get("lname")
    
    # # Create a new student object
    # new_student = Student(email=email, interests=interests, sessions=sessions, fname=fname, lname=lname)

    bson_bytes = bsonjs.loads(bson_dumps(data))
    # Insert the new student into the MongoDB collection
    inserted_id = coll.insert_one(RawBSONDocument(bson_bytes)).inserted_id
    
    return jsonify({"message": f"Student added successfully with id { inserted_id }!"}), 201

# API endpoint to get student data by email
@app.route("/api/student/<id>", methods=["GET"])
def get_student(id):
    student_data = coll.find_one({"_id": ObjectId(id)})
    
    if student_data:
        return jsonify(bsonjs.dumps(student_data.raw)), 200
    else:
        return jsonify({"message": "Student not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
