from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
import bsonjs
from bson.json_util import dumps as bson_dumps
from bson.raw_bson import RawBSONDocument
from bson.objectid import ObjectId
import random
import bson

from prompt import generate

load_dotenv()
app = Flask(__name__)

PROMPT = {
    "Passage": " \nThe Grand Bake-Off\nIt was an exciting day in the small town of Sweetville. The annual Grand Bake-Off was about to begin! This event brought together the best bakers in the town to show off their delicious creations. People came from near and far to watch and taste the mouthwatering treats.\nOne of the participants was Emma, a 10-year-old girl with a passion for baking. She loved experimenting with different flavors and ingredients to create unique desserts. For the Bake-Off, Emma decided to make her famous chocolate chip cookies with a twist\u2013 she added a caramel filling.\nAs the judges took their seats at the front of the room, Emma nervously arranged her cookies on a beautifully decorated plate. She couldn't wait for the judges to taste her creation. The Bake-Off was about to begin!\nEach participant presented their dish one by one, explaining the ingredients and techniques used. There were pies, cakes, cookies, and even a towering chocolate fountain. The room filled with the sweet aroma of freshly baked goods.\nFinally, it was Emma's turn. She confidently described her caramel-filled chocolate chip cookies, showcasing her baking skills to the judges. As they took a bite, their faces lit up with delight. The judges were impressed by the combination of the gooey caramel and the soft, melt-in-your-mouth cookies.\nAfter tasting all the delicious treats, the judges had the difficult task of selecting the winners. The participants anxiously waited for the results. When the winners were announced, the room erupted with applause.\nEmma couldn't believe her ears when her name was called as the first-place winner in the Kids' Category! Her caramel-filled chocolate chip cookies had won the hearts of the judges and the crowd. She proudly accepted her prize, a shiny blue ribbon, and smiled from ear to ear.\nThe Grand Bake-Off was a great success, leaving everyone with smiles on their faces and full bellies. Emma knew that baking was not just about creating delicious food, but also about bringing joy to others through her sweet creations.\n\n",
    "Question": [
        {
            "question": "1. What was the special twist that Emma added to her chocolate chip cookies?",
            "correct_answer": 0,
            "answers": [
                "A. Caramel filling",
                "B. Oreo crumbs",
                "C. Lemon zest",
                "D. Peanut butter"
            ],
            "type": "Inference"
        },
        {
            "question": "2. Why was the annual Grand Bake-Off exciting?",
            "correct_answer": 3,
            "answers": [
                "A. People came to watch a baking competition",
                "B. The participants were the best bakers in town",
                "C. Delicious treats were available to taste",
                "D. All of the above"
            ],
            "type": "Vocab"
        },
        {
            "question": "3. How did the judges react to Emma's caramel-filled chocolate chip cookies?",
            "correct_answer": 2,
            "answers": [
                "A. They were unimpressed",
                "B. They thought the cookies were too sweet",
                "C. They liked the combination of caramel and cookies",
                "D. They thought the cookies needed more flavor"
            ],
            "type": "Details"
        },
        {
            "question": "4. What prize did Emma receive for winning first place in the Kids' Category?",
            "correct_answer": 0,
            "answers": [
                "A. A shiny blue ribbon",
                "B. A trophy",
                "C. A gift card",
                "D. A baking book"
            ],
            "type": "Main Ideas"
        }
    ]
}

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

def get_student_by_id(id):
    return coll.find_one({"_id": ObjectId(id)})

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
    student_data = get_student_by_id(id)
    
    if student_data:
        return jsonify(bsonjs.dumps(student_data.raw)), 200
    else:
        return jsonify({"message": "Student not found"}), 404

@app.route("/api/student/generate/<id>", methods=["GET"])
def generate_prompt(id):
    data = get_student_by_id(id)["interests"]
    # todo: this is random for right now
    picked_interest = data[random.randint(0, len(data) - 1)]

    # default for now
    question_types = ["Inference", "Vocab", "Details", "Main Ideas"]

    try:
        prompt = generate(picked_interest, question_types)

        # todo: not putting stuff correctly
        coll["sessions"].update_one({"_id": ObjectId(id)}, {"$push": {"rounds": [{
            "text": prompt["Passage"],
            "questions": prompt["Question"]
        }]}})

        return jsonify({
            "text": prompt["Passage"],
            "questions": prompt["Question"]
        }), 200
    except Exception as e:
        print(e)
    
@app.route("/api/student/answer", methods=["POST"])
def answer():
    data = request.get_json()
    answers = data.get("answers")
    student_id = data.get("student_id")

    student_data = bson.decode(get_student_by_id(student_id).raw)

    # returns whether or not the answers were answered right as an array of boolean values
    ret = []
    if student_data:
        for index, answer in enumerate(answers):
            new_q = student_data["sessions"][-1]["rounds"][-1]["questions"][index] | {
                "selected_answer": answer,
            }

            sessions_len = len(student_data["sessions"]) - 1
            rounds_len = len(student_data["sessions"][-1]["rounds"]) - 1

            coll.update_one({"_id": ObjectId(student_id)}, {"$set": {f"sessions.{ sessions_len }.rounds.{ rounds_len }.questions.{ index }": new_q}})

            ret.append(answer == student_data["sessions"][-1]["rounds"][-1]["questions"][index]["correct_answer"])

        return jsonify({"answer_validation": ret}), 200
    else:
        return jsonify({"message": "Invalid student id"}), 404

if __name__ == "__main__":
    app.run(debug=True)
