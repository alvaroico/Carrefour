import { Pool, Client, QueryResult } from "pg";

const host = process.env.POSTGRES_HOST || 'localhost';

const port = process.env.POSTGRES_PORT || 5432;

const database = process.env.POSTGRES_DB || 'mydatabase';

const user = process.env.POSTGRES_USER || 'admin';

const password = process.env.POSTGRES_PASSWORD || 'admin';

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const pool = new Pool({
  connectionString,
});

export const PoolPostgreSQL = (query: string) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const client = new Client({
  connectionString,
});

client.connect();

export const ClientPostgreSQL = (query: string) => {
  return new Promise((resolve, reject) => {
    client.query(query, (err, res) => {
      if (err) {
        pool.end();
        reject(err);
      } else {
        pool.end();
        resolve(res);
      }
    });
  });
};

export { QueryResult };
