// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

// Rota para registrar um novo usuário
router.post("/register", AuthController.register);

// Rota para login
// router.post("/login", AuthController.login);

export default router;