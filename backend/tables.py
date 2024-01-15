import mysql.connector as mysql 

mysql = mysql.connect(user="root",password="sql123",host="localhost",database="project")

cursor = mysql.cursor()
cursor.execute("use project;")
cursor.execute("show tables;")
data = cursor.fetchall()
for m in data:
    for x in m:
        if x == "login":
            print("Exists")



