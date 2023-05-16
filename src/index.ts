import express from "express";
const app = express();
app.use(express.json());

// não dinâmico por conta da config do Nginx
const port = 3000;

import homeRota from "./Routes/home";
import Lancamento from "./Routes/Lancamento";
import { JWTDecode } from "./Middleware/JWTDecode";


app.use("/", homeRota);
app.use("/lancamento", JWTDecode('Caixa'), Lancamento);

app.listen(port, () => {
  console.log(`🙌😎 Servidor HTTP rodando porta: ${port} 👌`);
});