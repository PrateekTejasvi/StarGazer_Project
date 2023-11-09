import mysql.connector as mysql 

mysql = mysql.connect(user="root",password="sql123",host="localhost",database="project",auth_plugin="mysql_native_password");

cursor = mysql.cursor()

cursor.execute("use project;")

cursor.execute('''
               create table login(UserName varchar(20) primary key,Password varchar(20) NOT NULL); 
''')

cursor.execute('''

''')



