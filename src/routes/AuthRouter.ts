import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", asyncHandler(AuthController.login));

export default router;