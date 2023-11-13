import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="omena222",
    database="universidade"
)

mycursor = mydb.cursor()

mycursor.execute("""select
    p.nome as nome_professor,
    p.sexo as sexo_professor
from
    (select matricula_professor
     from ministra
     group by matricula_professor, codigo_disciplina
     having count(distinct codigo_curso, ano_semestre) > 1) as m
join pessoa as p on m.matricula_professor = p.matricula_pessoa
group by
    m.matricula_professor;""")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)