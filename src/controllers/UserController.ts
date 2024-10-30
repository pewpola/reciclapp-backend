import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.idUsuario));
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
}
