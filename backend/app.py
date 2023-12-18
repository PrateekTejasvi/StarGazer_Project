from flask import Flask,request,json,jsonify
from flask_cors import CORS
import mysql.connector as mysql

cxn = mysql.connect(user="root",password="sql123",database="project",host="localhost");
cursor = cxn.cursor(buffered=True)

app = Flask(__name__)
CORS(app)


@app.route("/signin",methods=['POST'])

def signin():
    email = request.form['email']
    password = request.form['password']
    print(email,password)
    if email and password: 
        return json.dumps({'validation' :validateUser(email,password)})
    return json.dumps({'validation' : False})

@app.route("/register",methods=['POST','GET'])
def register():
    email = request.form['email']
    password = request.form['password']
    location = request.form['location']
    print(email,password,location)
    if(Exists(email,password)):
        return json.dumps({'Exists':True})
    else:
        addToDb(email,password,location)
        return json.dumps({'Exists':False})
    

def Exists(email):
    data = cursor.execute(f"select * from user_data where email='{email}';")
    if data == None:
        return False
    if len(data) > 0:
        print("data already exits!")
        return True
    else:
        return False
def addToDb(email,password,location):
    cursor.execute(f"insert into user_data values('{email}','{password}','{location}');")
    cursor.execute("commit;")


def validateUser(username,password):
    return True
