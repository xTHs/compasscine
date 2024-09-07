
Bem-vindo! Este guia rápido irá ajudá-lo a configurar e rodar o projeto em poucos passos. Vamos lá!

Funcionalidades
- Cadastro de Filmes / sessões / tickets
- Atualização e remoção de registros
- Listagem de filmes / sessões / tickets
- Deleção de filmes / sessões / tickets

Pré-requisitos
- Node.js (versão 16 ou superior)
- NPM (versão 9 ou superior)
- Banco de dados SQLite (versão 3.46)



Instalação:

Clone o repositório:
'https://github.com/xTHs/compasscine.git'





Passo 1: Instalar Dependências

Antes de tudo, é necessário instalar todas as dependências do projeto.

Abra o terminal na raiz do projeto.

Rode o comando:

       npm install



Passo 2: Rodar as migrações do banco de dados.

Agora que as dependências estão instaladas, é preciso preparar o banco de dados rodando as migrações.

No terminal, execute o seguinte comando:

       npm run typeorm migration:run

Passo 3: Iniciar o servidor
Agora que o banco de dados está configurado, você pode rodar o servidor de desenvolvimento:

No terminal, digite:

       npm run dev


Passo 4: Acessar o banco de dados (SQLite)

Para visualizar e manipular os dados diretamente no banco, você pode usar o SQLite.

       Abra o SQLite
       Vá até a opção Open Database
       Navegue até a raiz do projeto
       Mude o seletor de extensões para  Todos os arquivos(*)
       Selecione o arquivo Compasscine

Utilize o arquivo Swagger para consultar todos os detalhes do projeto.

       http://localhost:3333/api-docs/

Agora você está pronto para explorar o projeto CompassCine.
