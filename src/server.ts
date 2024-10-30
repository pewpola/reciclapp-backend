import cors from "cors";
import express from "express";
import { router } from "./routes";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

dotenv.config();

const app = express();

app.use(errorHandlerMiddleware);
app.use(cors());
app.use('/api', router);

const PORT = process.env.API_PORT;
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`));