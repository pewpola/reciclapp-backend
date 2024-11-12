import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const userController = new UserController();

router.post("/", (req, res) => userController.create(req, res));
router.get("/profile", authMiddleware, (req, res) => userController.getProfile(req, res));
router.get("/:idUsuario", (req, res) => userController.getUser(req, res));
router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));

export default router;