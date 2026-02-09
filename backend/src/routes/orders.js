import express from 'express';
import orderController from '../controllers/orderController.js';
import validator from '../middleware/validation.js';

const router = express.Router();

router.post('/orders',
    validator.validateCreateOrder,
    orderController.createOrder
);

router.get('/orders/:id',
    validator.validateGetOrderById,
    orderController.getOrderById
);

router.patch('/orders/:id/status',
    validator.validateUpdateOrderStatus,
    orderController.updateOrderStatus
);

export default router;