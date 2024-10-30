
import prisma from "../database";

export class UserRepository {
    async getAllUsers() {
        return await prisma.usuario.findMany();
    }
    
    async create(userData: any): Promise<void> {
        await prisma.usuario.create({ data: userData });
    }

    async findByEmail(email: string) {
        return await prisma.usuario.findFirst({
            where: { emails: { some: { email } } },
        });
    }

    async getUserById(id: number) {
        return await prisma.usuario.findUnique({
            where: { idUsuario: id },
            include: {
                emails: true,
                telefones: true,
                moveis: true,
                carrinhos: true,
                servicos: true
            }
        });

    }
}