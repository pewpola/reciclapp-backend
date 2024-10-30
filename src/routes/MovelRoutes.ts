import { Router } from "express";
import { MovelController } from "../controllers/MovelController";

const router = Router();
const movelController = new MovelController();

// router.post("/", (req, res) => movelController.create(req, res));
// router.get("/", (req, res) => movelController.getByUser(req, res));
router.get("/all", (req, res, next) => movelController.index(req, res, next));

export default router;
