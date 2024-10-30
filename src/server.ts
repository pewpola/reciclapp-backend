import cors from "cors";
import express from "express";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.use(cors());
app.use(router);

const PORT = process.env.API_PORT;
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`));