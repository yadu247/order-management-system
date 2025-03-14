import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.put('/:id', verifyToken, updateOrder);
router.delete('/:id', verifyToken, deleteOrder);

export default router;
