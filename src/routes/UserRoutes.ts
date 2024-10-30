import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/", (req, res) => userController.create(req, res));
router.get("/:idUsuario", (req, res) => userController.getUser(req, res));
router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));

export default router;