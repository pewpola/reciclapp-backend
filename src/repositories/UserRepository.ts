import prisma from "../database";

export class UserRepository {
  async createUser(data: any) {
    return prisma.usuario.create({ data });
  }

  async findUserByEmail(email: string) {
    return prisma.email.findFirst({
      where: { email },
      include: { usuario: true },
    });
  }

  async getUserById(idUsuario: number) {
    return prisma.usuario.findUnique({
      where: { idUsuario },
      include: { emails: true, telefones: true },
    });
  }
}
