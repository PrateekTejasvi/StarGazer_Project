import datetime 
from time import sleep 
import requests
import json


def get_APOD():
    headers = {'Accept':'Application/json'}
    url = "https://api.nasa.gov/planetary/apod?api_key=qd7Cy01z06oPucpU35yaiPFjU1Jl6KDAp0scqbYR"
    q = requests.get(url,headers=headers)
    data = q.json()
    print(data["date"])
get_APOD()

