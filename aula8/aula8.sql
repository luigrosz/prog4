-- Aula 8 - Entidade Pessoa
-- TypeORM entity: id (PK auto), nome (varchar), idade (integer)

CREATE TABLE IF NOT EXISTS "pessoa" (
    "id"    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "nome"  VARCHAR NOT NULL,
    "idade" INTEGER NOT NULL
);

INSERT INTO "pessoa" ("nome", "idade") VALUES ('João Silva', 25);
INSERT INTO "pessoa" ("nome", "idade") VALUES ('Maria Souza', 30);

SELECT * FROM "pessoa";
