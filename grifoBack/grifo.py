import datetime
import http.server
import socketserver
import json
import mysql.connector
from urllib.parse import urlparse, parse_qs

from dateutil import parser

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
    
def get_obras(**filters):
    try:
        mydb = connect_db()
        mycursor = mydb.cursor(dictionary=True)

        # Construir a query SQL base
        query = 'SELECT * FROM Obra'
        keys = ['nome', 'artista_original']
        # Construir a cláusula WHERE com base nos filtros
        where_conditions = []
        print(filters.items())
        for value in filters.items():
            where_conditions.append(f"nome LIKE '%{value[1]}%'")
        for value in filters.items():
            where_conditions.append(f"artista_original LIKE '%{value[1]}%'")

        # Adicionar a cláusula WHERE à query se houver filtros
        if where_conditions:
            query += ' WHERE ' + ' OR '.join(where_conditions)

        print(query)
        mycursor.execute(query)
        obras = mycursor.fetchall()
        mycursor.close()
        mydb.close()

        return obras
    except Exception as e:
        print(f"Erro ao obter obras: {e}")
        return []

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

def insert_restauracao(obra_id):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    employees_query = "SELECT fk_Funcionario_id_funcionario FROM restaurador ORDER BY RAND() LIMIT 1"
    mycursor.execute(employees_query)
    employee = mycursor.fetchone()

    budgets_query = "SELECT cod_orcamento FROM Orcamento ORDER BY RAND() LIMIT 1"
    mycursor.execute(budgets_query)
    budget = mycursor.fetchone()

    query_restauracao = '''INSERT INTO restaura_obra_restaurador_orcamento (fk_Obra_id, fk_id_restaurador, fk_cod_orcamento)
                          VALUES (%s, %s, %s)'''
    values_restauracao = (
        obra_id,
        employee['fk_Funcionario_id_funcionario'],
        budget['cod_orcamento'],
    )
    mycursor.execute(query_restauracao, values_restauracao)
    mydb.commit()
    mycursor.close()
    mydb.close()

def insert_ficha(dados):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)
    ficha_data = dados["values"][0]
    data_inicio_obra_str = ficha_data["data_inicio_obra"]
    data_termino_obra_str = ficha_data["data_termino_obra"]

    # Usar dateutil.parser para converter as strings para objetos datetime
    data_inicio_obra_dt = parser.parse(data_inicio_obra_str)
    data_termino_obra_dt = parser.parse(data_termino_obra_str)

    # Formatar as datas no formato 'YYYY-MM-DD'
    data_inicio_obra_formatada = data_inicio_obra_dt.strftime('%Y-%m-%d')
    data_termino_obra_formatada = data_termino_obra_dt.strftime('%Y-%m-%d')
    id_obra = dados["id"]

    query_obter_fk = '''SELECT id_restauracao FROM Restaura_Obra_Restaurador_Orcamento WHERE fk_Obra_id = %s'''

    mycursor.execute(query_obter_fk, (id_obra,))
    resultado = mycursor.fetchone()

    if resultado:
        fk_id_restauracao = resultado['id_restauracao']
        print(ficha_data)
        query_inserir_ficha_tecnica = '''INSERT INTO Ficha_tecnica(data_inicio_obra, data_termino_obra, analise, empresa_prestadora_de_servico, descricao, tecnica_restauracao, fk_id_restauracao)
                                        VALUES (%s, %s, %s, %s, %s, %s, %s)'''
        values = (
            data_inicio_obra_formatada,
            data_termino_obra_formatada,
            ficha_data["analise"],
            ficha_data["empresa_prestadora_de_servico"],
            ficha_data["descricao"],
            ficha_data["tecnica_restauracao"],
            fk_id_restauracao
        )
        try:
            mycursor.execute(query_inserir_ficha_tecnica, values)
            mydb.commit()  
            ficha_id = mycursor.lastrowid
            mycursor.close()
            mydb.close()
        except:
            print ("Failed to add to MySQL database: \n%s", query_inserir_ficha_tecnica)
            mydb.close()
            exit()
        return ficha_id
    
def update_ficha(id, campo, novo_valor):
    try:
        mydb = connect_db()
        mycursor = mydb.cursor(dictionary=True)

        print(id)
        print(campo)
        print(novo_valor)
        query = f'''
            UPDATE Ficha_tecnica
            SET {campo} = %s
            WHERE fk_id_restauracao IN (
                SELECT ro.id_restauracao
                FROM Restaura_Obra_Restaurador_Orcamento ro
                WHERE ro.fk_Obra_id = %s
            )
        '''

        mycursor.execute(query, (novo_valor, id))
        mydb.commit()
        mycursor.close()
        mydb.close()

        return True, "Atualização bem-sucedida"
    except Exception as e:
        return False, f"Erro na atualização: {str(e)}"

def insert_funcionario(dados):
    mydb = connect_db()
    mycursor = mydb.cursor(dictionary=True)

    query_obter_pk = "SELECT telefone_Pk FROM telefone_funcionario ORDER BY RAND() LIMIT 1"
    mycursor.execute(query_obter_pk)

    telefone_pk_dados = mycursor.fetchone()
    telefone_pk = telefone_pk_dados["telefone_Pk"]
    nome = dados["values"][0]["nome"]
    email = dados["values"][0]["email"]
    estado = dados["values"][0]["estado"]
    rua = dados["values"][0]["rua"]
    bairro = dados["values"][0]["bairro"]
    cidade = dados["values"][0]["cidade"]
    numero = str(dados["values"][0]["numero"])
    salario = str(dados["values"][0]["salario"])

    query_inserir_funcionario = '''INSERT INTO Funcionario(nome, email, fk_telefone_pk, estado, rua, bairro, cidade, numero, salario)
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    values = (
        nome,
        email,
        telefone_pk,
        estado,
        rua,
        bairro,
        cidade,
        numero,
        salario
    )

    print(values)
    try:
        mycursor.execute(query_inserir_funcionario, values)
        mydb.commit()  
        funcionario_id = mycursor.lastrowid
        mycursor.close()
        mydb.close()
    except Exception as e:
        print ("Failed to add to MySQL database:", e)
        mydb.close()
        exit()

    return funcionario_id

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
    
def delete_funcionario(id_funcionario):
    mydb = connect_db()
    mycursor = mydb.cursor()

    try:
        delete_query = "DELETE FROM Funcionario WHERE id_funcionario = %s"
        mycursor.execute(delete_query, (id_funcionario,))
        mydb.commit()
        mycursor.close()
        mydb.close()
        return 1

    except mysql.connector.Error as error:
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
        if self.path.startswith('/obras'):
            # Parse os parâmetros da URL
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            print(query_params)
            # Converter os valores de lista para strings (se necessário)
            filters = {key: value[0] for key, value in query_params.items()}
            print(filters)
            # Sua lógica de negócios com os filtros
            obras = get_obras(**filters)

            # Envie a resposta JSON
            self._set_headers(200)
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
            ficha = get_ficha(id)
            if ficha:
                self._set_headers(200)
                self.wfile.write(json.dumps(ficha, indent=4, sort_keys=True, default=str).encode())
            else:
                self._set_headers(400)

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
                insert_restauracao(obra_id)
                self._set_headers(201)
                self.wfile.write(json.dumps({'obra_id': obra_id}).encode())
            else:
                response_data = {
                    'status': 'error',
                }
                self._set_headers(400)
                self.wfile.write(json.dumps(response_data).encode())

        elif self.path == '/insert-ficha':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            print(post_data)
            ficha_data = json.loads(post_data)
            ficha_id = insert_ficha(ficha_data)
            if ficha_id:
                self._set_headers(201)
                self.wfile.write(json.dumps({'ficha_id': ficha_id}).encode())
            else:
                response_data = {
                    'status': 'error',
                }
                self._set_headers(400)
                self.wfile.write(json.dumps(response_data).encode())
        
        elif self.path == '/insert-funcionario':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            funcionario_data = json.loads(post_data)
            funcionario_id = insert_funcionario(funcionario_data)
            if funcionario_id:
                self._set_headers(201)
                self.wfile.write(json.dumps({'funcionario_id': funcionario_id}).encode())
            else:
                response_data = {
                    'status': 'error',
                }
                self._set_headers(400)
                self.wfile.write(json.dumps(response_data).encode())

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
        if self.path == '/update-ficha':
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            ficha_data = json.loads(put_data)
            print(ficha_data)
            # Substitua a função apropriada para atualizar a ficha (por exemplo, update_ficha)
            ficha_updated = update_ficha(ficha_data['idObra'],ficha_data['campo'], ficha_data['valor'])
            
            if ficha_updated:
                self._set_headers(200)
                self.wfile.write(json.dumps({'status': 'success'}).encode())
            else:
                response_data = {
                    'status': 'error',
                    'message': 'Falha ao atualizar a ficha.'
                }
                self._set_headers(400)
                self.wfile.write(json.dumps(response_data).encode())
        else:
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

        elif self.path.startswith('/delete-funcionario/'):
            funcionario_id = self.path.split('/')[-1]
            success = delete_funcionario(funcionario_id)

            if success:
                self._set_headers(200)
                self.wfile.write(json.dumps({'message': 'funcionário deletado com sucesso'}).encode())
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({'message': 'funcionario não encontrado'}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'message': 'Rota não encontrada'}).encode())
        

with socketserver.TCPServer(("", PORT), RequestHandler) as httpd:
    print(f"Conectado na porta {PORT}")
    httpd.serve_forever()