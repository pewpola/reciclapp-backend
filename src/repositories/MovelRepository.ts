import prisma from '../database';
import IMovelRepository from '../interfaces/IMovelRepository';
import { Movel } from '@prisma/client';

export class MovelRepository implements IMovelRepository {

  async getAllMoveis(): Promise<Movel[]> {
    return prisma.movel.findMany();
  }

  async createMovel(data: { nome: string; preco: number; estado: string; descricao: string; urlImagem: string; Usuario_idUsuario: number }): Promise<Movel> {
    return prisma.movel.create({
      data: {
        nome: data.nome,
        preco: data.preco,
        estado: data.estado,
        descricao: data.descricao,
        urlImagem: data.urlImagem,
        usuario: {
          connect: { idUsuario: data.Usuario_idUsuario }
        },
      },
    });
  }  

  async getMoveisByUser(userId: number): Promise<Movel[]> {
    return prisma.movel.findMany({ where: { Usuario_idUsuario: userId } });
  }

  async findById(id: number): Promise<Movel | null> {
    return prisma.movel.findUnique({ where: { idMovel: id } });
  }

  async update(id: number, data: Partial<Movel>): Promise<Movel> {
    return prisma.movel.update({
      where: { idMovel: id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.movel.delete({ where: { idMovel: id } });
  }
}
