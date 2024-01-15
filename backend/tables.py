import mysql.connector as mysql 

mysql = mysql.connect(user="root",password="sql123",host="localhost",database="project")

cursor = mysql.cursor()
cursor.execute("use project;")
cursor.execute("show tables;")
data = cursor.fetchall()

q1 = "create table login(email varchar(20) primary key,password varchar(20))"
q2 = "create table register(email varchar(20) primary key,password varchar(20),location varchar(20))"
q3 = "create table location(city varchar(20))"
q4 = "create table coordinates(email varchar(20),latitude float,longitude float,city varchar(20))"
q5 = "create table APOD(Date date primary key,title varchar(20))" 


cursor.execute(q1)
cursor.execute(q2)
cursor.execute(q3)
cursor.execute(q4)
cursor.execute(q5)




