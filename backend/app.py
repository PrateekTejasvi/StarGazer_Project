from flask import Flask,jsonify
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mr = Marshmallow(app)


@app.route('/',methods= ['GET'])
def test():
    return "w"

if __name__ == "__main__":
    app.run(host="192.168.0.108",port=3000,debug=True)




