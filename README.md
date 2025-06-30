# Projeto 1 de Programação Web Fullstack
Este projeto foi criado para a disciplina de Programação Full-Stack. 
Nosso objetivo consiste em criar uma plataforma capaz de realizar pesquisas de noticias utilizando a API thenewsapi.

## Como rodar o projeto localmente
### 1. Instalação do vite
Utilize o comando <pre> ```npm install -g vite``` </pre> dentro do terminal da pasta do projeto para instalar o Vite globalmente no seu sistema.
### 2. Instalação de dependências
Utilize o comando <pre> ```npm install``` </pre> dentro do terminal da pasta do projeto.
### 3. Iniciar Frontend - Modo Dev
Após a instalação das dependências utilize o comando <pre> ```npm run dev``` </pre> no terminal do projeto para iniciar o Frontend.
### 4. Iniciar Frontend - Modo Produção
Após a instalação das dependências utilize o comando <pre> ```npm run build``` </pre> e depois o comando  <pre> ```npm start``` </pre> no terminal do projeto para iniciar o Frontend.
### 4. Rota do navegador
Entre na rota http://localhost:5173/ ou http://localhost:3001 no seu navegador para poder utilizar a aplicação

## Como rodar o Backend localmente
### 1. Configuração do ambiente
Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:
<pre>
VITE_DB_KEY=sua_chave_mongodb
VITE_BACKEND_PORT=8080
</pre>

### 2. Instalação de dependências do Backend
Navegue até a pasta `backend/` e execute o comando:
<pre> ```npm install``` </pre>

### 3. Configuração do MongoDB
- Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
- Crie um cluster gratuito
- Obtenha a string de conexão e substitua `sua_chave_mongodb` no arquivo `.env`
- A string de conexão deve seguir o padrão: `mongodb+srv://usuario:senha@cluster.mongodb.net/`

### 4. Iniciar Backend - Modo Desenvolvimento
Execute o comando <pre> ```npm run back:dev``` </pre> para iniciar o servidor com nodemon (reinicia automaticamente ao detectar mudanças).

### 5. Iniciar Backend - Modo Produção
Execute o comando <pre> ```npm run back``` </pre> para iniciar o servidor em modo produção.

### 6. Verificar funcionamento
O servidor estará rodando em `http://localhost:8080` (ou na porta definida em VITE_BACKEND_PORT).

### 7. Endpoints disponíveis
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `POST /api/login` - Autenticação
- `GET /api/news` - Listar notícias
- `POST /api/news` - Criar notícia
- `GET /api/search` - Buscar notícias

## Critérios de avaliação - PARTE 1
Os critérios de avaliação definidos na proposta do Projeto 1 foram atendidos e podem ser identificados do seguinte modo:
- ### Atendimento as diretrizes de desenvolvimento web apresentadas durante as aulas. 
A forma como o projeto foi desenvolvido segue a forma como o conteúdo foi abordado dentro das aulas disponibilizadas.
- ### Estrutura do projeto utilizando Webpack/create-react-app ou outra estrutura concordada com o professor (por exemplo o Vite).
A estrutura utiliza no presente trabalho foi o Vite.
- ### Busca com envio de parametros para a API JSON.
É feita a busca por meio de parâmetros para a API dentro da pasta `src\components\NewsList\index.jsx` onde, dentro do useEffect, é utlizado o fetch com a URL alterada com parâmetros de pesquisa, sendo eles: *API_KEY* (variável para realizar a conexão do sistema com a API), *searchTerm* (variável utlizada para realizar buscas), *state.page* (variável utilizada para definir a página desajada dentre os resultados obtidos) e *language* (variável que define a linguagem do site e das notícias obtidas).
- ### Verificação de preenchimento de campos obrigatórios na busca. 
A verificação é realizada dentro da searchBox no início da tela, sendo **necessário inserir pelo menos 3 caracteres** para que a busca seja validada. ![img](./public/min_char_exemple.png)
- ### Apresentação de mensagens de erro de validação antes e depois do envio dos dados para a API.
São apresentadas as mensagens assim como solicitado.
- ### Implementação de componentes e comunicação de componentes React.js com a Context API ou REDUX.
Os componentes criados se comunicam utilizando a **Context API** e está localizada na pasta `src\contexts`
- ### Implementação da funcionalidade/hook selecionado pelo grupo.
O hook escolhido foi o useReducer, o qual ainda atuou em conjunto com o useContext, useEffect e useState. Sua implementação está no arquivo `src\components\NewsList\index.jsx`
- ### Uso de uma biblioteca externa selecionada pelo grupo.
Foi utilizado a [Material UI](https://mui.com/material-ui/).
- ### Geração do pacote de deployment da aplicação e disponibilização em um servidor web.
O deploy da aplicação dentro de um servidor web pode ser acessado através do link: https://fullstack-i9v0.onrender.com/
- ### Atualização incremental das mudanças de código-fonte no Git.
Os commits e atualizações foram feitos de forma incremental, seguindo a solicitação do professor.

## Critérios de avaliação - PARTE 2
### Implementação de cada requisito-  (Login, Busca e Inserção) no Frontend com React.js
O frontend mantém a estrutura do PROJETO 1 com React.js, implementando sistema de login com autenticação JWT, busca de notícias com filtros por idioma, inserção e gerenciamento de notícias, e interface responsiva com Material UI.

- ### Implementação de cada requisito (Login, Busca e Inserção) no Backend com Express.js
O backend foi desenvolvido com Express.js seguindo a estrutura de pastas organizada em src/config (server.js, connectDB.js, logger.js, cache.js), src/models (Users.js, News.js), src/routes (login.js, users.js, news.js, search.js) e index.js principal.

- ### Verificação de preenchimento de campos no servidor
Implementada validação server-side para campos obrigatórios em todas as rotas, validação de formato de email e validação de ObjectId do MongoDB.

- ### Envio de mensagens de validação do servidor
O servidor retorna mensagens específicas para erros de validação de campos, falhas de autenticação, recursos não encontrados e erros de operação no banco de dados.

- ### Implementação do padrão REST na API desenvolvida
API RESTful implementada com endpoints:
- GET /api/users (listar usuários)
- POST /api/users (criar usuário)
- PUT /api/users/:id (atualizar usuário)
- DELETE /api/users/:id (deletar usuário)
- POST /api/login (autenticação)
- GET /api/news (listar notícias)
- POST /api/news (criar notícia) 
- GET /api/search (buscar notícias).

- ### Implementação de regras de segurança
Para falhas de identificação e autenticação foi configurado rate limiting (5 tentativas por IP, bloqueio de 15 min), tokens JWT com expiração de 1 hora, middleware de autenticação para rotas protegidas e invalidação correta de tokens. Para falhas de registro e monitoramento foi implementado sistema de logs com Winston, logs de segurança em src/security.log, logs de atividade em src/app.log e monitoramento de login, buscas e operações CRUD.

- ### Implementação de otimização do Frontend
Implementada compressão de arquivos estáticos via Vite, build otimizado para produção e lazy loading de componentes.

- ### Implementação da estratégia de cache no Backend
Configurado cache em memória com Node-Cache.

- ### Configuração do padrão de pool de conexões
Pool de conexões MongoDB configurado com maxPoolSize: 10 (máximo 10 conexões simultâneas), minPoolSize: 2 (mínimo 2 conexões ativas), maxIdleTimeMS: 30000 (timeout de 30s para conexões inativas), serverSelectionTimeoutMS: 5000 (timeout de 5s para seleção do servidor) e socketTimeoutMS: 45000 (timeout de 45s para operações).

## Tecnologias Utilizadas
### Frontend
- **React.js** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Material UI** - Biblioteca de componentes
- **Context API** - Gerenciamento de estado
- **React Hooks**: useReducer, useContext, useEffect, useState

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB

### Segurança
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **winston** - Sistema de logs

### Performance
- **node-cache** - Cache em memória
- **cors** - Cross-Origin Resource Sharing

### API Externa
- **TheNewsAPI** - API pública de notícias ([link](https://www.thenewsapi.com/)) utilizada na parte 1

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **Trello** - Gerenciamento de projeto
- **Discord** - Comunicação da equipe

## Autores
- [@Gustavo Bueno de Carvalho](https://github.com/gustavo-bueno)
- [@Marcos Vinícius Bueno Prestes](https://github.com/BuenoMVP)