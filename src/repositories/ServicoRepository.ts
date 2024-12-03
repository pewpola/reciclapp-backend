import { PrismaClient } from "@prisma/client";
import { IServicoRepository } from "../interfaces/IServicoRepository";

const prisma = new PrismaClient();

export class ServicoRepository implements IServicoRepository {
  async createServico(data: {
    nome: string;
    cep: string;
    rua: string;
    tipo: string;
    descricao: string;
    Usuario_idUsuario: number;
  }) {
    return await prisma.servico.create({
      data,
    });
  }

  async listServicos(userId: number) {
    return await prisma.servico.findMany({
      where: { Usuario_idUsuario: userId },
    });
  }
}