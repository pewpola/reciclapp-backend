import { Request, Response } from 'express';
import { CarrinhoService } from '../services/CarrinhoService';

const carrinhoService = new CarrinhoService();

export class CarrinhoController {
    static async getCarrinho(req: Request, res: Response) {
        const userId = parseInt(res.locals.userId);
        const carrinho = await carrinhoService.getCarrinhoByUserId(userId);
        res.json(carrinho);
    }

    static async addItem(req: Request, res: Response) {
        const userId = parseInt(res.locals.userId);
        const { movelId, quantidade } = req.body;
        const item = await carrinhoService.addItemToCarrinho(userId, movelId, quantidade);
        res.json(item);
    }

    static async removeItem(req: Request, res: Response) {
        const { carrinhoId, itemId } = req.params;
        await carrinhoService.removeItemFromCarrinho(parseInt(carrinhoId), parseInt(itemId));
        res.sendStatus(204);
    }

    static async clearCarrinho(req: Request, res: Response) {
        const carrinhoId = parseInt(req.params.carrinhoId);
        await carrinhoService.clearCarrinho(carrinhoId);
        res.sendStatus(204);
    }
}
