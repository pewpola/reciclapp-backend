import { Router } from "express";
import { ServicoController } from "../controllers/ServicoController";
import { authMiddleware } from "../middlewares/auth-middleware";

const servicoController = new ServicoController();
const router = Router();

router.post("/", authMiddleware, (req, res) => servicoController.create(req, res));
router.get("/", authMiddleware, (req, res) => servicoController.list(req, res));

export default router;