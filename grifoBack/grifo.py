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
        database="grifo"
    )
    return mydb

def authenticate_user(dados):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)

    # Consulta SQL para verificar se o email e a senha correspondem a um funcionário
    query = '''SELECT * FROM funcionario WHERE email = %s AND senha = %s'''
    values = (
        dados["email"], 
        dados["password"],
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
    bens_moveis = dados["obraMovel"]

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
        mycursor.execute(query, values)
        mydb.commit()
        obra_id = mycursor.lastrowid
        if bens_moveis:
            data_moveis = dados["bemMovel"]
            query_bens_moveis = '''INSERT INTO Bens_moveis (fk_Obra_id_obra, descricao) 
                                VALUES (%s, %s)'''
            values_bens_moveis = (
                obra_id,
                data_moveis["descricao"],
            )
            mycursor.execute(query_bens_moveis, values_bens_moveis)
            mydb.commit()
        else:
            data_imoveis = dados["bemImovel"]
            query_bens_imoveis = '''INSERT INTO Bens_imoveis (fk_Obra_id_obra, estado, rua, bairro, cidade, numero) 
                                    VALUES (%s, %s, %s, %s, %s, %s)'''
            values_bens_imoveis = (
                obra_id,
                data_imoveis["estado"],
                data_imoveis["rua"],
                data_imoveis["bairro"],
                data_imoveis["cidade"],
                data_imoveis["numero"],
            )
            mycursor.execute(query_bens_imoveis, values_bens_imoveis)
            mydb.commit()
    
        mycursor.close()
        mydb.close()
    except:
        print ("Failed to add to MySQL database: \n%s", query)
        mydb.close()
        exit()
    return obra_id

def delete_obra(id_obra):
    mydb = connect_db()
    mycursor = mydb.cursor()

    try:
        # Comando para deletar a obra
        delete_query = "DELETE FROM Obra WHERE id_obra = %s"
        mycursor.execute(delete_query, (id_obra,))
        mydb.commit()

        print(f"Obra com ID {id_obra} foi excluída com sucesso.")
        mycursor.close()
        mydb.close()
        return 1

    except mysql.connector.Error as error:
        print("Erro ao deletar a obra:", error)
        mydb.rollback()
        mycursor.close()
        mydb.close()
        return 0

class RequestHandler(http.server.BaseHTTPRequestHandler):

    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
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
            print(post_data)
            obra_data = json.loads(post_data)
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
                # Se a autenticação for bem-sucedida, gere um token
                token = str(len(funcionario[0]['nome']))

                # Resposta bem-sucedida com o token
                response_data = {
                    'status': 'success',
                    'message': 'Login bem-sucedido',
                    'token': token
                }
                self._set_headers(200)
            else:
                # Resposta de autenticação falhada
                response_data = {
                    'status': 'error',
                    'message': 'Credenciais inválidas'
                }
                self._set_headers(400)

            # Envie a resposta como JSON
            self.wfile.write(json.dumps(response_data).encode())

        else:
            self._set_headers(404)

    def do_PUT(self):
        # Adicionar o script de update quando tiver pronto
        self._set_headers(404)

    def do_DELETE(self):
        if self.path.startswith('/delete-obra/'):
            obra_id = self.path.split('/')[-1]
            success = delete_obra(obra_id)

            if success:
                self._set_headers(200)
                self.wfile.write(json.dumps({'message': 'Obra deletada com sucesso'}).encode())
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({'message': 'Obra não encontrada'}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'message': 'Rota não encontrada'}).encode())

with socketserver.TCPServer(("", PORT), RequestHandler) as httpd:
    print(f"Conectado na porta {PORT}")
    httpd.serve_forever()