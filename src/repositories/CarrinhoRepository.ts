import { PrismaClient } from '@prisma/client';
import { ICarrinhoRepository } from '../interfaces/ICarrinhoRepository';

const prisma = new PrismaClient();

export class CarrinhoRepository implements ICarrinhoRepository {
    async getCarrinhoByUserId(userId: number) {
        return await prisma.carrinho.findFirst({
            where: { Usuario_idUsuario: userId },
            include: { itens: true },
        });
    }

    async addItemToCarrinho(userId: number, movelId: number, quantidade: number) {
        let carrinho = await prisma.carrinho.findFirst({
            where: { Usuario_idUsuario: userId },
        });
    
        if (!carrinho) {
            carrinho = await prisma.carrinho.create({
                data: { Usuario_idUsuario: userId },
            });
        }
    
        return await prisma.itemCarrinho.create({
            data: {
                Carrinho_idCarrinho: carrinho.idCarrinho,
                Movel_idMovel: movelId,
                quantidade,
            },
        });
    }
    

    async removeItemFromCarrinho(carrinhoId: number, itemId: number) {
        await prisma.itemCarrinho.delete({
            where: { idItem: itemId },
        });
    }

    async clearCarrinho(carrinhoId: number) {
        await prisma.itemCarrinho.deleteMany({
            where: { Carrinho_idCarrinho: carrinhoId },
        });
    }

    async getItensCarrinho(carrinhoId: number) {
        return await prisma.itemCarrinho.findMany({
            where: { Carrinho_idCarrinho: carrinhoId },
            include: { movel: true },
        });
    }
}
