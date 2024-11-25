import { PrismaClient } from '@prisma/client';
import { ICarrinhoRepository } from '../interfaces/ICarrinhoRepository';

const prisma = new PrismaClient();

export class CarrinhoRepository implements ICarrinhoRepository {
    async getCarrinhoByUserId(userId: number) {
        return await prisma.carrinho.findFirst({
            where: { Usuario_idUsuario: userId },
            include: { itens: { include: { movel: true } } },
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
    
        const itemExistente = await prisma.itemCarrinho.findFirst({
            where: {
                Carrinho_idCarrinho: carrinho.idCarrinho,
                Movel_idMovel: movelId,
            },
        });
    
        if (itemExistente) {
            const novaQuantidade = itemExistente.quantidade + quantidade;
    
            if (novaQuantidade < 1) {
                throw new Error('A quantidade mínima permitida é 1.');
            }
    
            return await prisma.itemCarrinho.update({
                where: { idItem: itemExistente.idItem },
                data: { quantidade: novaQuantidade },
                include: { movel: true },
            });
        }
    
        return await prisma.itemCarrinho.create({
            data: {
                Carrinho_idCarrinho: carrinho.idCarrinho,
                Movel_idMovel: movelId,
                quantidade,
            },
            include: { movel: true },
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

    async updateItemQuantidade(itemId: number, quantidadeIncremento: number) {
        const item = await prisma.itemCarrinho.findUnique({ where: { idItem: itemId } });
    
        if (!item) {
            throw new Error('Item não encontrado.');
        }
    
        const novaQuantidade = item.quantidade + quantidadeIncremento;
        if (novaQuantidade < 1) {
            throw new Error('Quantidade não pode ser menor que 1.');
        }
    
        return prisma.itemCarrinho.update({
            where: { idItem: itemId },
            data: { quantidade: novaQuantidade },
        });
    }
    
    async getQuantidadeTotalItens(userId: number): Promise<number> {
        const carrinho = await prisma.carrinho.findFirst({
            where: { Usuario_idUsuario: userId },
            include: { itens: true },
        });
    
        if (!carrinho || !carrinho.itens) {
            return 0;
        }
    
        return carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
    }
    
}
