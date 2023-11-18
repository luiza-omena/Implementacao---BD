import mysql.connector

def connect_db():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="omena222",
        database="grifo"
    )
    return mydb

def get_obras():
    mydb = connect_db()
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM Obra')
    obras = mycursor.fetchall()
    mycursor.close()
    return obras

def get_funcionarios():
    mydb = connect_db()
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM funcionario')
    funcionarios = mycursor.fetchall()
    mycursor.close()
    return funcionarios

def get_clientes():
    mydb = connect_db()
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM cliente')
    clientes = mycursor.fetchall()
    mycursor.close()
    return clientes

def insert_obra(dados):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    
    query = '''INSERT INTO Obra (nome, artista_original, movimento_artistico, dimensoes) 
               VALUES (%s, %s, %s, %s)'''
    values = (
        dados["nome"], 
        dados["artista_original"], 
        dados["movimento_artistico"], 
        dados["dimensoes"], 
    )
    
    mycursor.execute(query, values)
    mydb.commit()
    obra_id = mycursor.lastrowid
    mycursor.close()
    mydb.close()
    return obra_id

print(get_obras())