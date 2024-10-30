import cors from "cors";
import express from "express";
import movelRoutes from './routes/MovelRoutes';
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

dotenv.config();

const app = express();

app.use(errorHandlerMiddleware);
app.use(cors());
app.use('/moveis', movelRoutes);

const PORT = process.env.API_PORT;
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`));