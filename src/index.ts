import express from "express";
const app = express();
app.use(express.json());

import homeRota from "./Routes/home";
import Lancamento from "./Routes/Lancamento";
import { JWTDecode } from "./Middleware/JWTDecode";


app.use("/", homeRota);
app.use("/lancamento", JWTDecode('lancamentoDecode'), Lancamento);

app.listen(3000, () => {
  console.log(`🙌😎 Servidor HTTP rodando porta: ${3000} 👌`);
});