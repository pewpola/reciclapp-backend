// src/controllers/AuthController.ts

import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      console.log(req.body);
      const token = await authService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Erro ao registrar usuário" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const token = await authService.login(email, senha);
      if (!token) return res.status(401).json({ error: "Credenciais inválidas" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}
