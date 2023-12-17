from flask import Flask,request,jsonify
from flask_cors import CORS
import mysql.connector as mysql

cxn = mysql.connect(user="root",password="sql123",database="project",host="localhost");
cursor = cxn.cursor()

app = Flask(__name__)
CORS(app)

@app.route('/api/user',methods=['POST']) 
def handle_user_data():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        
        response_data = {
            'message': 'Data received successfully!',
            'username': username,
            'email': email,
        }
        
        return jsonify(response_data)


if __name__ == "__main__" : 
    app.run(debug = True)
