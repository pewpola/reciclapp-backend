// src/services/AuthService.ts

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../database";

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || "defaultSecret";

  async register(userData: { nome: string; cep: string; rua: string; numero: number; senha: string; email: string; telefone: string }): Promise<string> {
    const hashedPassword = await bcrypt.hash(userData.senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome: userData.nome,
        cep: userData.cep,
        rua: userData.rua,
        numero: userData.numero,
        emails: { create: { email: userData.email } },
        telefones: { create: { numero: userData.telefone } },
        senha: hashedPassword,
      },
    });

    return this.generateToken(usuario.idUsuario);
  }

  async login(email: string, senha: string): Promise<string | null> {
    const usuario = await prisma.usuario.findFirst({
      where: { emails: { some: { email } } },
    });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return null;
    }

    return this.generateToken(usuario.idUsuario);
  }

  private generateToken(userId: number): string {
    return jwt.sign({ userId }, this.jwtSecret, { expiresIn: "1h" });
  }
}
