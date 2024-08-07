
# Projeto CRUD de Usuários e Eventos  Desafio 3 - Semana 12 - Node & AWS

Este projeto é uma aplicação backend desenvolvida com **Express.js** e **TypeScript** que implementa um CRUD para Usuários e Eventos, incluindo autenticação JWT para segurança. Os dados são armazenados em um banco de dados **MongoDB**. O projeto é implantado em uma instância **EC2 da AWS**.

## Requisitos

- **Node.js** e **npm** instalados
- **MongoDB** para armazenamento de dados
- **AWS EC2** para implantação

## Estrutura do Projeto

- `src/controllers/` - Controladores para lógica de negócios
- `src/models/` - Modelos de dados
- `src/routes/` - Definição das rotas
- `src/middlewares/` - Middlewares, incluindo autenticação JWT
- `src/tests/` - Testes unitários
- `src/index.ts` - Arquivo principal para inicialização do servidor

## Rotas da API

As rotas estão documentadas no [Swagger](https://app.swaggerhub.com/apis/docs/PAULOSENA/sp_nigeria_third_challenge/1.0.0). As rotas bloqueadas necessitam de autenticação JWT.

### Usuários

- **POST** `/api/users/sign-up` - Registro de um novo usuário
- **POST** `/api/users/sign-in` - Autenticação do usuário

### Eventos

- **GET** `/api/events` - Listar todos os eventos
- **GET** `/api/events/:id` - Obter detalhes de um evento específico
- **POST** `/api/events` - Criar um novo evento
- **PUT** `/api/events/:id` - Atualizar um evento existente
- **DELETE** `/api/events/:id` - Deletar um evento

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/EduardoOngaratto/PbMaioDes3_EduardoOngaratto
    ```

2. Navegue para o diretório do projeto:

    ```bash
    cd repositorio
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione:

    ```
    MONGO_URI=mongodb://<usuario>:<senha>@<host>:<porta>/<database>
    JWT_SECRET=sua_chave_secreta
    ```

5. Inicie o servidor localmente:

    ```bash
    tsc
    npm start
    ```

## Testes

Para executar os testes unitários:

1. Certifique-se de que o MongoDB está em execução.
2. Execute os testes:

    ```bash
    npm test
    ```

## Contribuidores

- **Eduardo Ongaratto** - Desenvolvimento e manutenção


## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.


![Logo do Projeto](https://s3.sa-east-1.amazonaws.com/remotar-assets-prod/company-profile-covers/cl7god9gt00lx04wg4p2a93zt.jpg)
