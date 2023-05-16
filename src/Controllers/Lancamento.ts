import { Request, Response, NextFunction } from "express";
import { PoolPostgreSQL, QueryResult } from "../connection/PostgreSQL";
import { contacts } from "../interfaces/Macapa";

const Debito = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { contacts } = request.body as { contacts: Array<contacts> };

  if (contacts != undefined && contacts.length > 0) {
    let dadosInseridos = false;
    for await (const dadoContacts of contacts) {
      await PoolPostgreSQL(`INSERT INTO public.contacts
      (nome, celular)
      VALUES('${dadoContacts.name}', '${dadoContacts.cellphone}')`)
        .then((result) => {
          const PoolPostgreSQLRetorno = result as QueryResult;
          if (
            PoolPostgreSQLRetorno.rowCount == 0 &&
            PoolPostgreSQLRetorno.rowCount == undefined
          ) {
            response.status(400).json({
              message: `Erro ao Salvar no PoolPostgreSQL ${PoolPostgreSQLRetorno}`,
            });
          } else {
            dadosInseridos = true;
          }
        })
        .catch((error) => {
          dadosInseridos = false;
          response.status(400).json({
            message: `Erro ao Salvar no PoolPostgreSQL ${error}`,
          });
        });
    }
    if (dadosInseridos) {
      response.status(200).json({
        message: "Contatos Cadastrados",
      });
    }
  } else {
    response.status(400).json({
      message: "Contatos não informados",
    });
  }
};

const Credito = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { contacts } = request.body as { contacts: Array<contacts> };

  if (contacts != undefined && contacts.length > 0) {
    let dadosInseridos = false;
    for await (const dadoContacts of contacts) {
      await PoolPostgreSQL(`INSERT INTO public.contacts
      (nome, celular)
      VALUES('${dadoContacts.name}', '${dadoContacts.cellphone}')`)
        .then((result) => {
          const PoolPostgreSQLRetorno = result as QueryResult;
          if (
            PoolPostgreSQLRetorno.rowCount == 0 &&
            PoolPostgreSQLRetorno.rowCount == undefined
          ) {
            response.status(400).json({
              message: `Erro ao Salvar no PoolPostgreSQL ${PoolPostgreSQLRetorno}`,
            });
          } else {
            dadosInseridos = true;
          }
        })
        .catch((error) => {
          dadosInseridos = false;
          response.status(400).json({
            message: `Erro ao Salvar no PoolPostgreSQL ${error}`,
          });
        });
    }
    if (dadosInseridos) {
      response.status(200).json({
        message: "Contatos Cadastrados",
      });
    }
  } else {
    response.status(400).json({
      message: "Contatos não informados",
    });
  }
};

export default {
  Debito: Debito,
  Credito: Credito,
};
