import { Request, Response, NextFunction } from "express";
import { PoolPostgreSQL, QueryResult } from "../connection/PostgreSQL";
import { lancamentos } from "../interfaces/Lancamentos";

const DebitoCredito = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { conta, valor, tipo } = request.body as lancamentos;
  if (isNaN(conta)) {
    return response.status(400).json({
      message: "Conta inválida",
    });
  }

  if (isNaN(valor)) {
    return response.status(400).json({
      message: "Valor inválida",
    });
  }

  if (["Debito", "Credito"].includes(tipo) === false) {
    return response.status(400).json({
      message: "Tipo inválida",
    });
  }

  let dadosInseridos = false;
  if (tipo === "Debito") {
    await PoolPostgreSQL(`INSERT INTO public.debito
      (conta, valor, created_at)
      VALUES(${conta}, ${valor}, now());`)
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
    if (dadosInseridos) {
      response.status(200).json({
        message: "Debito Cadastrado",
      });
    }
  }
  if (tipo === "Credito") {
    await PoolPostgreSQL(`INSERT INTO public.credito
      (conta, valor, created_at)
      VALUES(${conta}, ${valor}, now());`)
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
    if (dadosInseridos) {
      response.status(200).json({
        message: "Credito Cadastrado",
      });
    }
  }
};

export default {
  DebitoCredito: DebitoCredito,
};
