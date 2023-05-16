import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get(
  "/health",
  function (request: Request, response: Response, next: NextFunction) {
    const uptime = process.uptime();
    response.status(200).send(`A API está em execução há ${uptime} segundos.`);
  }
);

export default router;
