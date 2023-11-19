import hashlib
from jose import jwt
import http.server
import socketserver
import json
import mysql.connector

PORT = 8080
SECRET_KEY = 'Mydbgrifo'
ALGORITHM = 'HS256'

def connect_db():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="omena222",
        database="grifo2"
    )
    return mydb

def authenticate_user(dados):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)

    # Consulta SQL para verificar se o email e a senha correspondem a um funcionário
    query = '''SELECT * FROM funcionario WHERE email = %s AND senha = %s'''
    hashed_password = hashlib.sha256(dados['password'].encode()).hexdigest()
    values = (
        dados["email"], 
        dados["hashed_password"],
    )

    print(values)
    try:
        mycursor.execute(query, values)
        funcionario = mycursor.fetchall()

        if not funcionario:
            print("Authentication failed. No matching user found.")
            return None

        return funcionario

    except mysql.connector.Error as e:
        print("Failed to execute query. Error:", str(e))
        mydb.rollback()
        exit()

    finally:
        mycursor.close()
        mydb.close()
    
def get_obras():
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM Obra')
    obras = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return obras

def get_ficha(id):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    query = '''
        SELECT ft.*
        FROM Ficha_tecnica ft
        INNER JOIN Restaura_Obra_Restaurador_Orcamento ro ON ft.fk_id_restauracao = ro.id_restauracao
        WHERE ro.fk_Obra_id = %s
    ''' 
    mycursor.execute(query, (id,))
    ficha = mycursor.fetchall()
    mycursor.close()
    mydb.close()
    return ficha

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
    obra_data = dados["values"][0]

    query = '''INSERT INTO Obra (nome, artista_original, movimento_artistico, dimensoes, img)
               VALUES (%s, %s, %s, %s, %s)'''
    values = (
        obra_data["nome"],
        obra_data["artista_original"],
        obra_data["movimento_artistico"],
        obra_data["dimensoes"],
        obra_data["img"],
    )
    try:
        print(values)
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
        elif self.path.startswith('/fichaTecnica/'):
            id = self.path.split('/')[-1]
            self._set_headers(200)
            ficha = get_ficha(id)
            self.wfile.write(json.dumps(ficha, indent=4, sort_keys=True, default=str).encode())
        else:
            self._set_headers(404)

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_POST(self):
        if self.path == '/insert-obra':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            obra_data = json.loads(post_data)
            print(obra_data)
            obra_id = insert_obra(obra_data)
            if obra_id:
                self._set_headers(201)
                self.wfile.write(json.dumps({'obra_id': obra_id}).encode())
            else:
                self._set_headers(400)

        elif self.path == '/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            login_data = json.loads(post_data)
            funcionario = authenticate_user(login_data)

            if funcionario:
                token_payload = {'email': funcionario['email'], 'id': funcionario['id_funcionario']}
                token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')

                response_data = {
                    'status': 'success',
                    'message': 'Login bem-sucedido',
                    token: token.decode('utf-8')
                }

                self.wfile.write(json.dumps(response_data).encode('utf-8'))
                self._set_headers(200)
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