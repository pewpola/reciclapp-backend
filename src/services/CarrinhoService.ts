import { CarrinhoRepository } from '../repositories/CarrinhoRepository';

export class CarrinhoService {
    private carrinhoRepository: CarrinhoRepository;

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
    }

    async getCarrinhoByUserId(userId: number) {
        return await this.carrinhoRepository.getCarrinhoByUserId(userId);
    }

    async addItemToCarrinho(userId: number, movelId: number, quantidade: number) {
        return await this.carrinhoRepository.addItemToCarrinho(userId, movelId, quantidade);
    }

    async removeItemFromCarrinho(carrinhoId: number, itemId: number) {
        await this.carrinhoRepository.removeItemFromCarrinho(carrinhoId, itemId);
    }

    async clearCarrinho(carrinhoId: number) {
        await this.carrinhoRepository.clearCarrinho(carrinhoId);
    }

    async getItensCarrinho(carrinhoId: number) {
        return await this.carrinhoRepository.getItensCarrinho(carrinhoId);
    }

    async updateQuantidade(userId: number, itemId: number, quantidadeIncremento: number) {
        const carrinho = await this.carrinhoRepository.getCarrinhoByUserId(userId);
    
        if (!carrinho || !carrinho.itens.find(item => item.idItem === itemId)) {
            throw new Error('Item não pertence ao carrinho do usuário.');
        }
    
        return this.carrinhoRepository.updateItemQuantidade(itemId, quantidadeIncremento);
    }

    async getQuantidadeTotalItens(userId: number): Promise<number> {
        return await this.carrinhoRepository.getQuantidadeTotalItens(userId);
    }
    
    
}