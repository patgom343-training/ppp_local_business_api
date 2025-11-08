# PPP Local Business API

## Descrição

API RESTful para conectar empreendedores locais e clientes, com autenticação JWT, controle de acesso por roles (`business` e `customer`), documentação Swagger e testes automatizados (Mocha, Chai, Supertest e K6).

## Funcionalidades

- **Autenticação e Autorização**:
  - Registro e login de usuários com dois papéis:
    - `customer`: acesso apenas a registro, login e consultas (GET) de empreendimentos e produtos.
    - `business`: acesso total (CRUD) a empreendimentos, categorias e produtos.
  - Autenticação via JWT.

- **Gestão de Empreendimentos, Categorias e Produtos**:
  - CRUD completo para usuários do tipo `business`.

- **Funcionalidades para Clientes (`customer`)**:
  - Consultas por nome, categoria, empreendimentos destacados e produtos.

- **Documentação da API**:
  - Disponível via Swagger em `/api-docs`.

- **Testes Automatizados**:
  - Testes de integração: Mocha, Chai, Supertest.
  - Testes de performance: K6.

## Estrutura de Pastas

```
src/
  controllers/
  middleware/
  models/
  resources/
  routes/
  services/
tests/
  apiRest/
  testK6/
```

## Tecnologias Utilizadas

- Node.js
- Express
- JWT
- Swagger UI Express
- js-yaml
- Mocha, Chai, Supertest (testes)
- K6 (performance)

## Instalação
## Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:

```
BASE_URL_REST=http://localhost:3000
JWT_SECRET=sua_chave_secreta
```

Consulte o código para outras variáveis obrigatórias.

1. Clone o repositório:
   ```bash
   git clone https://github.com/patgom343-training/ppp_local_business_api.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd ppp_local_business_api
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

1. Inicie o servidor:
   ```bash
   npm run start
   ```

2. Acesse a documentação da API em:
   ```
   http://localhost:3000/api-docs
   ```

## Testes
### Relatórios Mochawesome

Os testes automatizados geram relatórios em HTML usando o Mochawesome. Após rodar os testes, acesse o relatório em:

```
mochawesome-report/mochawesome.html
```

Para configurar o Mochawesome, veja o arquivo `package.json` e as opções do Mocha.
### Relatórios K6

O K6 pode gerar relatórios em diferentes formatos. Para gerar um relatório em HTML, use:

```bash
k6 run tests/testK6/seuTeste.js --out json=resultado.json
k6 report resultado.json --out=resultado.html
```

Consulte a [documentação do K6](https://k6.io/docs/results-output/) para mais opções de exportação de relatórios.

### Testes de Integração
```bash
npm test
```

### Testes de Performance (K6)
```bash
k6 run tests/testK6/*.js
```

## Endpoints Principais

- **Autenticação**:
  - `POST /auth/register`: Registro de usuários.
  - `POST /auth/login`: Login de usuários.

- **Gestão de Categorias** (apenas para `business`):
  - `POST /business/categories`: Registro de categorias.
  - `PUT /business/categories`: Edição de categorias.
  - `DELETE /business/categories`: Remoção de categorias.

- **Gestão de Empreendimentos** (apenas para `business`):
  - `POST /business/businesses`: Registro de empreendimentos.
  - `PUT /business/businesses`: Edição de empreendimentos.
  - `DELETE /business/businesses`: Remoção de empreendimentos.

- **Gestão de Produtos** (apenas para `business`):
  - `POST /products`: Registro de produtos.
  - `PUT /products`: Edição de produtos.
  - `DELETE /products`: Remoção de produtos.

- **Funcionalidades para Clientes (`customer`)**:
  - `GET /business/businesses`: Consulta de empreendimentos.
  - `GET /business/by-category`: Consulta por categoria.
  - `GET /business/starred`: Consulta de empreendimentos destacados.
  - `GET /business/by-name`: Consulta por nome.
  - `GET /products`: Consulta de produtos.
  - `GET /products/starred`: Consulta de produtos destacados.
  - `GET /products/by-name`: Consulta de produtos por nome.

## Observações

- Para rodar testes K6, utilize apenas recursos nativos do K6 (não use módulos npm).
- O sistema está preparado para testes de integração e performance.
- Consulte o Swagger para detalhes de parâmetros e respostas dos endpoints.


