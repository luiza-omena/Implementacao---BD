# Grifo

O site da Grifo é uma vitrine da expertise da empresa em restauração de arte, focando em ativos móveis e imóveis. Fundada em 2002 por Pérside Omena, a Grifo dedica-se à preservação e revitalização do patrimônio artístico por meio de serviços especializados de restauração. O site não apenas narra a trajetória da empresa, mas também destaca projetos inspiradores que contribuíram para a apreciação e conservação de legados artísticos ao longo dos anos.

## Tecnologias Utilizadas

### Frontend

- **Vite**: Ferramenta de construção eficiente para configuração de projetos.
- **Tailwind CSS**: Framework de estilização para um design responsivo e visualmente atraente.
- **React com TypeScript**: Desenvolvimento robusto e seguro usando TypeScript com a biblioteca React.
<p>
  <a href="https://vitejs.dev/">
    <img src="https://vitejs.dev/logo.svg" alt="Vite" width="64" height="64">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="64" height="64">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="64" height="64">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="64" height="64">
  </a>
</p>

### Backend

- **Python**: Linguagem de servidor backend.
- **http.server e socketserver**: Módulos Python para criar um servidor web simples para servir arquivos frontend.
- **urllib**: Módulo Python para manipulação de URLs e strings de consulta.
- **mysql.connector**: Conector para interação com o banco de dados MySQL.

<p>
  <a href="https://www.python.org/">
    <img src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png" alt="Python" width="64" height="64">
  </a>
</p>

## Configuração do Projeto

### Docker
O projeto pode ser executado usando Docker Compose, o que simplifica a inicialização do ambiente de desenvolvimento, gerenciando tanto o backend quanto o frontend e o banco de dados de forma integrada.

Pré-requisitos:
Docker e Docker Compose instalados em sua máquina. Visite Docker para instruções de instalação.

Inicie os serviços rodando:
```bash
docker-compose up --build
```

Este comando construirá e levantará todos os serviços definidos no arquivo docker-compose.yml, incluindo o backend, o frontend e o banco de dados. Não é necessário iniciar o servidor backend separadamente, pois ele será automaticamente gerenciado pelo Docker Compose.

Abra seu navegador e acesse http://127.0.0.1:4173/
### Frontend(grifoFront)

**Nota:** Antes de começar, certifique-se de ter o Node.js instalado em sua máquina. O React é construído sobre o Node.js, então, se você ainda não o tem, pode baixá-lo em [https://nodejs.org/](https://nodejs.org/). Escolha a versão "LTS" (Long-Term Support) para maior estabilidade. Além disso, é recomendável ter um editor de código, como o VSCode, para trabalhar com o código.

Para executar o projeto, certifique-se de ter o Node.js e o npm instalados no seu sistema.

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/luiza-omena/Implementacao---BD.git
   cd grifoFront
      ```
2. Instale as dependências::
   npm install
3. Inicie o servidor de desenvolvimento:
   npm run dev
4. Abra seu navegador e acesse http://127.0.0.1:5173/


**Nota:** Nota: Antes de começar, certifique-se de ter o Python instalado em sua máquina. O código do backend é desenvolvido em Python, e você pode baixar a versão mais recente em https://www.python.org/. Certifique-se também de adicionar o Python ao PATH durante a instalação.
### Backend(grifoBack)

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/luiza-omena/Implementacao---BD.git
   cd grifoBack
      ```
2. Instale as dependências::
   pip install mysql-connector-python
3. Inicie o servidor de desenvolvimento:
   python grifo.py

### Conexão com o Banco de Dados

Para estabelecer uma conexão com o banco de dados MySQL,coloque suas informações do banco de dados na seguinte função em Python:

```python
def connect_db():
    mydb = mysql.connector.connect(
        host="db",
        user="root",
        password="suaSenha",
        database="grifo"
    )
    return mydb


