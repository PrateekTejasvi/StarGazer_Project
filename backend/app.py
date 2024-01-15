from flask import Flask,request,json
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
    if(Exists(email)):
        return json.dumps({'Exists':True})
    else:
        addToDb(email,password,location)
        return json.dumps({'Exists':False})
    

def Exists(email):
    cursor.execute(f"select * from user_data where email='{email}';")
    data = cursor.fetchall()
    if data == None:
        return False
    if len(data) > 0:
        print("data already exits!")
        return True
    else:
        return False
def addToDb(email,password,location):
    cursor.execute("show tables;")
    data = cursor.fetchall()
    for m in data:
        for x in m:
            if x == "user_data":
                try:
                    cursor.execute(f"insert into user_data values('{email}','{password}','{location}');")
                    cursor.execute("commit;")
                except Exception as e:
                    print(f"{e}")

def validateUser(username,password):
    cursor.execute(f"select * from login where email='{username}' and password='{password}';")
    data = cursor.fetchone()
    try:
        if username and password in data:
            return json.dumps({'user_login':True})
        else:
            return json.dumps({'user_login':False})
    except TypeError:
        return False
        
def createTable():
    cursor.execute("show tables;")
    data = cursor.fetchall()
    for m in data:
        for x in m:
            if x == "user_data":
                break
            elif x == "loin":
                break
    else:
        #issue create command for creating datbases 

    


