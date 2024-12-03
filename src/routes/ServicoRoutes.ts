import { Router } from "express";
import { ServicoController } from "../controllers/ServicoController";
import { authMiddleware } from "../middlewares/auth-middleware";
import asyncHandler from "express-async-handler"; // Certifique-se de instalar este pacote

const servicoController = new ServicoController();
const router = Router();

router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => await servicoController.create(req, res))
);

router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => await servicoController.list(req, res))
);

export default router;
