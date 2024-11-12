import { Router } from "express";
import { MovelController } from "../controllers/MovelController";
import asyncHandler from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const movelController = new MovelController();

router.post("/", authMiddleware, asyncHandler(movelController.create.bind(movelController)));
router.get("/", asyncHandler(movelController.index.bind(movelController)));
router.get("/usuario", authMiddleware, asyncHandler(movelController.getMovelByUser.bind(movelController)));
router.get("/:idMovel", asyncHandler(movelController.getMovelById.bind(movelController)));
router.put("/:idMovel", authMiddleware, asyncHandler(movelController.update.bind(movelController))); 
router.delete("/:idMovel", authMiddleware, asyncHandler(movelController.delete.bind(movelController)));

export default router;
