
import express from 'express';
import { createOrder ,getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);

export default router;
