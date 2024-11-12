import express from 'express';
import { CarrinhoController } from '../controllers/CarrinhoController';

const router = express.Router();

router.get('/:userId', CarrinhoController.getCarrinho);
router.post('/add/:userId', CarrinhoController.addItem);
router.delete('/:carrinhoId/item/:itemId', CarrinhoController.removeItem);
router.delete('/:carrinhoId/clear', CarrinhoController.clearCarrinho);

export default router;