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
}