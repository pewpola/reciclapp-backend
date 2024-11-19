import cors from "cors";
import express from "express";
import movelRoutes from './routes/MovelRoutes';
import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRouter'
import carrinhoRoutes from './routes/CarrinhoRoutes';
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(cors());

app.use('/users', userRoutes);
app.use('/moveis', movelRoutes);
app.use('/auth', authRoutes);
app.use('/carrinho', carrinhoRoutes);

const PORT = process.env.API_PORT;
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`));