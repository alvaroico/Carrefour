import express from "express";
const router = express.Router();
import Lancamento from "../Controllers/Lancamento";

router.post("/", Lancamento.DebitoCredito);

export default router;
