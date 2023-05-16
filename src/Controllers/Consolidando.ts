import { Request, Response, NextFunction } from "express";
import { PoolPostgreSQL, QueryResult } from "../connection/PostgreSQL";

const All = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { dateInitial, dateFinal } = request.query;
  // verificar se a data inicial e final é valida
  if (dateInitial === undefined || dateFinal === undefined) {
    return response.status(400).json({
      message: "Data inicial e final são obrigatórios",
    });
  }
  // verificar se a data inicial e final é valida
  if (new Date(dateInitial.toString()).toString() === "Invalid Date") {
    return response.status(400).json({
      message: "Data inicial inválida",
    });
  }
  // verificar se a data inicial e final é valida
  if (new Date(dateFinal.toString()).toString() === "Invalid Date") {
    return response.status(400).json({
      message: "Data final inválida",
    });
  }

  await PoolPostgreSQL(`select
	DATE_TRUNC('day',
	d.created_at) as data,
	d.conta,
	SUM(d.valor) as debito,
	c.conta,
	SUM(c.valor) as credito,
	SUM(c.valor) - SUM(d.valor) as total
from
	debito d
join credito c on
	d.conta = c.conta
where
	d.created_at >= '${dateInitial}'
	and c.created_at >= '${dateInitial}'
  and d.created_at <= '${dateFinal}'
  and c.created_at <= '${dateFinal}'
group by
	DATE_TRUNC('day',
	d.created_at),
	d.conta,
	c.conta
union all
select
	DATE_TRUNC('day',
	d.created_at) as data,
	d.conta,
	SUM(d.valor) as debito,
	null as conta,
	null as credito,
	-SUM(d.valor) as total
from
	debito d
left join credito c on
	d.conta = c.conta
where
	d.created_at >= '${dateInitial}'
  and d.created_at <= '${dateFinal}'
	and c.conta is null
group by
	DATE_TRUNC('day',
	d.created_at),
	d.conta
union all
select
	DATE_TRUNC('day',
	c.created_at) as data,
	null as conta,
	null as debito,
	c.conta,
	SUM(c.valor) as credito,
	SUM(c.valor) as total
from
	credito c
left join debito d on
	c.conta = d.conta
where
	c.created_at >= '${dateInitial}'
  and c.created_at <= '${dateFinal}'
	and d.conta is null
group by
	DATE_TRUNC('day',
	c.created_at),
	c.conta;`)
    .then((result) => {
      const PoolPostgreSQLRetorno = result as QueryResult;
      response.status(200).json(PoolPostgreSQLRetorno.rows);
    })
    .catch((error) => {
      response.status(400).json({
        message: `Erro ao consultar no PoolPostgreSQL ${error}`,
      });
    });
};

export default {
  All: All,
};
