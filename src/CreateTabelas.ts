import { PoolPostgreSQL } from "./connection/PostgreSQL";

const job = async () => {
  await PoolPostgreSQL(`CREATE TABLE IF NOT EXISTS debito (
    id SERIAL PRIMARY KEY,
    conta INT NOT NULL,
    valor DECIMAL NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
  
  CREATE TABLE IF NOT EXISTS credito (
    id SERIAL PRIMARY KEY,
    conta INT NOT NULL,
    valor DECIMAL  NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`)
    .then(async (resultado) => {
      // console.log(resultado);
      console.info("Tabela no PostgreSQL criada com sucesso!");
    })
    .catch((err) => {
      console.log(err);
    });
  process.exit(0);
};
job();
