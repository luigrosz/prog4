# Aula 8 - Entidade Pessoa

## Entity (TypeORM)

```typescript
@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  idade: number;
}
```

## SQL Schema

```sql
CREATE TABLE IF NOT EXISTS "pessoa" (
    "id"    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "nome"  VARCHAR NOT NULL,
    "idade" INTEGER NOT NULL
);
```

## Inserts

```sql
INSERT INTO "pessoa" ("nome", "idade") VALUES ('João Silva', 25);
INSERT INTO "pessoa" ("nome", "idade") VALUES ('Maria Souza', 30);
```

## Select All

```sql
SELECT * FROM "pessoa";
```

| id | nome        | idade |
|----|-------------|-------|
| 1  | João Silva  | 25    |
| 2  | Maria Souza | 30    |
