<h1 align="center">Compacine</h1>

# About

Welcome!
This is a REST API developed for a cinema ticketing system.
The quick guide below will help you set up and run the project in just a few steps. Let's get started!

## EndPoints

#### You can consume this API using Insomnia or Postman
#### The server will run on localhost:3333/api

### Movies

- **GET** `/movies`
- **GET** `/movies/:id`
- **POST** `/movies`
- **PUT** `/movies/:id`
- **DELETE** `/movies/:id`

### Sessions

 - POST `/movies/{movie_id}/sessions`
 - PUT `/movies/{movie_id}/sessions/:id`
 - DELETE `/movies/{movie_id}/sessions/:id`

### Tickets 

 - POST `/movies/{movie_id}/sessions/{session_id}/tickets`
 - PUT  `/movies/{movie_id}/sessions/{session_id}/tickets/:id`
 - DELETE `/movies/{movie_id}/sessions/{session_id}/tickets/:id`




## Prerequisites

- Node.js (version 16 or higher)
- NPM (version 9 or higher)
- SQLite database (version 3.46)

## Installation

Clone the repository:
'https://github.com/xTHs/compasscine.git'

## Step 1: Install Dependencies

First, you need to install all project dependencies.

Open the terminal at the project's root.

Run the command:

       npm install

## Step 2: Run the Database Migrations

Now that the dependencies are installed, you need to prepare the database by running the migrations.

In the terminal, run the following command:

       npm run typeorm migration:run

## Step 3: Start the Server

Now that the database is configured, you can run the development server.

In the terminal, type:

       npm run dev

## Step 4: Access the Database (SQLite)

To view and manipulate the data directly in the database, you can use SQLite.

       Open SQLite
       Go to the "Open Database" option
       Navigate to the root of the project
       Change the extension selector to "All Files(*)"
       Select the "Compasscine" file

** Use the Swagger documentation to check all project details. **

       http://localhost:3333/api-docs/

Now you're ready to explore the CompassCine project.



# PORTUGUÊS

# Sobre

Bem-vindo!
Essa é uma API REST desenvolvida para a bilheteria de um cinema.
O guia rápido abaixo irá ajudá-lo a configurar e rodar o projeto em poucos passos. Vamos lá!



## EndPoints 

#### Você pode consumir essa API utilizando o Insomnia ou Postman
 
### Filmes

- **GET** `/movies`
- **GET** `/movies/:id`
- **POST** `/movies`
- **PUT** `/movies/:id`
- **DELETE** `/movies/:id`

### Sessões

 - POST `/movies/{movie_id}/sessions`
 - PUT `/movies/{movie_id}/sessions/:id`
 - DELETE `/movies/{movie_id}/sessions/:id`

### Ingressos

 - POST `/movies/{movie_id}/sessions/{session_id}/tickets`
 - PUT  `/movies/{movie_id}/sessions/{session_id}/tickets/:id`
 - DELETE `/movies/{movie_id}/sessions/{session_id}/tickets/:id`



## Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM (versão 9 ou superior)
- Banco de dados SQLite (versão 3.46)

## Instalação:

Clone o repositório:
'https://github.com/xTHs/compasscine.git'

## Passo 1: Instalar Dependências

Antes de tudo, é necessário instalar todas as dependências do projeto.

Abra o terminal na raiz do projeto.

Rode o comando:

       npm install

## Passo 2: Rodar as migrações do banco de dados.

Agora que as dependências estão instaladas, é preciso preparar o banco de dados rodando as migrações.

No terminal, execute o seguinte comando:

       npm run typeorm migration:run

## Passo 3: Iniciar o servidor

Agora que o banco de dados está configurado, você pode rodar o servidor de desenvolvimento:

No terminal, digite:

       npm run dev

## Passo 4: Acessar o banco de dados (SQLite)

Para visualizar e manipular os dados diretamente no banco, você pode usar o SQLite.

       Abra o SQLite
       Vá até a opção Open Database
       Navegue até a raiz do projeto
       Mude o seletor de extensões para  Todos os arquivos(*)
       Selecione o arquivo Compasscine

** Utilize a documentação no Swagger para consultar todos os detalhes do projeto. **

       http://localhost:3333/api-docs/


Agora você está pronto para explorar o projeto CompassCine.


