# Daria Wiki — Full-Stack Application

Aplicação full-stack da enciclopédia da série Daria. Front-end HTML/CSS/JS vanilla, back-end NestJS + PostgreSQL.

## Estrutura

```
trabalho-2/
├── frontend/              # Front-end estático (HTML/CSS/JS)
├── backend/               # Back-end NestJS + TypeORM
│   └── src/
│       ├── articles/      # Módulo CRUD de artigos
│       ├── app.module.ts
│       ├── main.ts
│       └── seed.ts
└── docker-compose.yml     # PostgreSQL (opcional)
```

## Pré-requisitos

- **Node.js** ≥ 18, **npm** ≥ 9
- **PostgreSQL** ≥ 14 (local ou Docker)

## Configuração do Ambiente

### PostgreSQL

**Opção A — Docker:**

```bash
docker compose up -d
```

**Opção B — Local:**

```bash
psql -U postgres -c "CREATE USER daria WITH PASSWORD 'daria123';"
psql -U postgres -c "CREATE DATABASE daria_wiki OWNER daria;"
psql -U postgres -d daria_wiki -c "GRANT ALL ON SCHEMA public TO daria;"
```

### Variáveis de Ambiente (opcionais)

| Variável  | Default      |
|-----------|-------------|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432`      |
| `DB_USER` | `daria`     |
| `DB_PASS` | `daria123`  |
| `DB_NAME` | `daria_wiki`|
| `PORT`    | `3000`      |

### Instalação e Seed

```bash
cd backend
npm install
npm run seed      # popula o banco com 24 artigos
```

### Executar

```bash
npm run start:dev
```

- Front-end: `http://localhost:3000`
- API: `http://localhost:3000/api/articles`
- **Swagger UI**: `http://localhost:3000/api/docs`

## Documentação da API (Swagger)

Documentação interativa disponível em: **`http://localhost:3000/api/docs`**

### Endpoints

| Método | Rota                  | Descrição                              |
|--------|-----------------------|----------------------------------------|
| GET    | `/api/articles`       | Listar artigos (ordenado por `sortOrder`) |
| GET    | `/api/articles?category=X` | Filtrar por categoria            |
| GET    | `/api/articles/:id`   | Obter artigo por ID                    |
| POST   | `/api/articles`       | Criar artigo                           |
| PUT    | `/api/articles/:id`   | Atualizar artigo                       |
| DELETE | `/api/articles/:id`   | Remover artigo                         |

### Schema do Artigo

| Campo       | Tipo    | Obrigatório | Descrição                    |
|-------------|---------|-------------|------------------------------|
| `title`     | string  | Sim         | Título do conteúdo           |
| `content`   | string  | Sim         | Corpo principal do artigo    |
| `imageUrl`  | string  | Não         | Caminho/URL da imagem        |
| `sortOrder` | number  | Sim         | Ordem de apresentação        |
| `category`  | string  | Não         | Categoria do artigo          |

## Execução dos Testes

```bash
cd backend
npm test              # 23 testes unitários
npm run test:cov      # com cobertura
```

## Exemplos de Requisições

```bash
# Listar todos
curl http://localhost:3000/api/articles

# Filtrar por categoria
curl 'http://localhost:3000/api/articles?category=personagens'

# Criar artigo
curl -X POST http://localhost:3000/api/articles \
  -H 'Content-Type: application/json' \
  -d '{"title":"Novo","content":"Conteúdo","sortOrder":999,"category":"extra"}'

# Atualizar
curl -X PUT http://localhost:3000/api/articles/1 \
  -H 'Content-Type: application/json' \
  -d '{"title":"Atualizado"}'

# Remover
curl -X DELETE http://localhost:3000/api/articles/1
```
