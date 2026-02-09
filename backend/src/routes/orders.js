import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders',
    orderController.createOrder
);

router.get('/orders/:id',
    orderController.getOrderById
);

router.patch('/orders/:id/status',
    orderController.updateOrderStatus
);

export default router;