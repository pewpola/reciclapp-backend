import express from 'express';
import { CarrinhoController } from '../controllers/CarrinhoController';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = express.Router();

router.get('/', authMiddleware, CarrinhoController.getCarrinho);
router.post('/add', authMiddleware, CarrinhoController.addItem);
router.delete('/:carrinhoId/item/:itemId', CarrinhoController.removeItem);
router.delete('/clear/:carrinhoId', CarrinhoController.clearCarrinho);
router.patch('/increment/item/:itemId', authMiddleware, CarrinhoController.incrementarQuantidade);
router.patch('/decrement/item/:itemId', authMiddleware, CarrinhoController.decrementarQuantidade);
router.get('/quantidade-total', authMiddleware, CarrinhoController.getQuantidadeTotal);


export default router;