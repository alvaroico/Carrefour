import express from "express";
const router = express.Router();
import Consolidado from "../Controllers/Consolidando";

router.get("/", Consolidado.All);

export default router;
