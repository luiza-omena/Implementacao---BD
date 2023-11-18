import http.server
import socketserver
import json
import mysql.connector

PORT = 8080

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
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM Obra')
    obras = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return obras

def get_funcionarios():
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM funcionario')
    funcionarios = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return funcionarios

def get_clientes():
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM cliente')
    clientes = mycursor.fetchall()
    mycursor.close()
    mydb.close()
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
    try:
        mycursor.execute(query, values)
        mydb.commit()
        obra_id = mycursor.lastrowid
        mycursor.close()
        mydb.close()
    except:
        print ("Failed to add to MySQL database: \n%s", query)
        mydb.close()
        exit()
    return obra_id

class RequestHandler(http.server.BaseHTTPRequestHandler):

    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == '/obras':
            self._set_headers(200)
            obras = get_obras()
            self.wfile.write(json.dumps(obras).encode())
        elif self.path == '/funcionarios':
            self._set_headers(200)
            funcionarios = get_funcionarios()
            self.wfile.write(json.dumps(funcionarios).encode())
        elif self.path == '/clientes':
            self._set_headers(200)
            clientes = get_clientes()
            self.wfile.write(json.dumps(clientes).encode())
        else:
            self._set_headers(404)

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_POST(self):
        if self.path == '/insert-obra':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            obra_data = json.loads(post_data)

            obra_id = insert_obra(obra_data)
            if obra_id:
                self._set_headers(201)
                self.wfile.write(json.dumps({'obra_id': obra_id}).encode())
            else:
                self._set_headers(400)
        else:
            self._set_headers(404)

    def do_PUT(self):
        # Adicionar o script de update quando tiver pronto
        self._set_headers(404)

    def do_DELETE(self):
        # Adicionar o script de delete quando tiver pronto
        self._set_headers(404)

with socketserver.TCPServer(("", PORT), RequestHandler) as httpd:
    print(f"Conectado na porta {PORT}")
    httpd.serve_forever()