import prisma from '../database';
import IMovelRepository from '../interfaces/IMovelRepository';

export class MovelRepository implements IMovelRepository  {
  async getAllMoveis() {
    return prisma.movel.findMany();
  }

  async createMovel(data: any) {
    return prisma.movel.create({ data });
  }

  async getMoveisByUser(userId: number) {
    return prisma.movel.findMany({ where: { Usuario_idUsuario: userId } });
  }
}