import { Carrinho, ItemCarrinho } from '@prisma/client';

export interface ICarrinhoRepository {
    getCarrinhoByUserId(userId: number): Promise<Carrinho | null>;
    addItemToCarrinho(userId: number, movelId: number, quantidade: number): Promise<ItemCarrinho>;
    removeItemFromCarrinho(carrinhoId: number, itemId: number): Promise<void>;
    clearCarrinho(carrinhoId: number): Promise<void>;
    getItensCarrinho(carrinhoId: number): Promise<ItemCarrinho[]>;
    updateItemQuantidade(itemId: number, quantidadeIncremento: number): Promise<ItemCarrinho>;
    getQuantidadeTotalItens(userId: number): Promise<number>;
}