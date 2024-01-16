from flask import Flask,request,json
from flask_cors import CORS
import mysql.connector as mysql
import requests
import urllib.request
import firebaseImage
from datetime import date 
from datetime import timedelta
current_date = date.today() - timedelta(days=1)
cxn = mysql.connect(user="root",password="sql123",database="project",host="localhost");
cursor = cxn.cursor(buffered=True)

app = Flask(__name__)
CORS(app)

API_KEY = "qd7Cy01z06oPucpU35yaiPFjU1Jl6KDAp0scqbYR"

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
    

@app.route("/request/APOD",methods=['GET','POST'])
def get_APOD():
    headers = {'Accept':'Application/json'}
    url = f"https://api.nasa.gov/planetary/apod?api_key={API_KEY}&date={current_date}"
    q = requests.get(url,headers=headers)
    data = q.json()
    opener=urllib.request.build_opener()
    opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
    urllib.request.install_opener(opener)
    filename = f"{data['title']}.jpg"
    imageURL = data['url']
    urllib.request.urlretrieve(imageURL,filename)
    firebaseImage.UploadImage(filename,"APOD")
    addToAPOD(data["date"],data["title"])
    return json.dumps(data)

@app.route("/request/Rover",methods=['GET','POST'])

def get_Rover():
    headers = {'Accept':'Application/json'}
    url = f"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key={API_KEY}"
    q = requests.get(url,headers=headers)
    data = q.json()
    opener=urllib.request.build_opener()
    opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
    urllib.request.install_opener(opener)
    filename = "Rover.jpg"
    imageURL = data["latest_photos"][1]["img_src"]
    urllib.request.urlretrieve(imageURL, filename)
    firebaseImage.UploadImage("Rover.jpg")
    return json.dumps(data)


@app.route("/request/ExpPlanets",methods=['GET','POST'])
def get_Planets():
    return json.dumps("test")

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
    
def checkLocations(location):
    cursor.execute(f"select * from valid_locations where location='{location}'")
    data = cursor.fetchall()
    if data == None:
        return False 
    if len(data) > 0:
        print("Data exists!")
        return True
    else:
        return False

def addToDb(email,password,location):
    cursor.execute(f"insert into register values('{email}','{password}','{location}');")
    cursor.execute(f"commit;")
def addToAPOD(selected_date,title):
    cursor.execute(f"select * from APOD where Date='{selected_date}';")
    data = cursor.fetchall()
    print(data)
    if data == []: 
        print("test")
        cursor.execute(f"insert into APOD values('{selected_date}','{title}');")
        cursor.execute("commit;")
    else: 
        return "Data Already exits!"


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

def getTitle(selected_date):
    cursor.execute(f"select title from APOD where Date='{selected_date}';")
    data = cursor.fetchall()
    if data == []:
        print("no data exists!")
        #refetch image for that date 
    else:
        return json.dumps({'title':data})      


#create sql table for login 
#create sql table for registration 
#create sql table for locations 
#create sql table for valid locations 
#create sql table for latitude , longitutde -> mapped to certain places 
#file handling 


