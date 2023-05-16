import express from "express";
const router = express.Router();
import Lancamento from "../Controllers/Lancamento";

router.get("/", function (req, res) {
  res.send("Rota Lançamento debito/credito");
});

router.post("/debito", Lancamento.Debito);
router.post("/credito", Lancamento.Credito);

export default router;
