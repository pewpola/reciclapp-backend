// src/routes/auth.routes.ts
import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

// Rota para registrar um novo usuário
router.post("/register", AuthController.register);

// Rota para login
router.post("/login", asyncHandler(AuthController.login));

export default router;