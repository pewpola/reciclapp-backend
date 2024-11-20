import express from 'express';
import { CarrinhoController } from '../controllers/CarrinhoController';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = express.Router();

router.get('/', authMiddleware, CarrinhoController.getCarrinho);
router.post('/add', authMiddleware, CarrinhoController.addItem);
router.delete('/:carrinhoId/item/:itemId', CarrinhoController.removeItem);
router.delete('/clear/:carrinhoId', CarrinhoController.clearCarrinho);

export default router;