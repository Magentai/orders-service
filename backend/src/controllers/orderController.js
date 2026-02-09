import Order from '../models/Order.js';
import AppServerError from '../classes/AppServerError.js';

export default {
    createOrder: async (req, res, next) => {
        try {
            const { customer_email, items } = req.body;

            const order = await Order.create(customer_email, items);

            res.status(200).json({
                ok: true,
                id: order.id,
                status: order.status
            });
        } catch (error) {
            next(error);
        }
    },
    getOrderById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (id.length !== 36) {
                throw new AppServerError({
                    message: 'Некорректный ID заказа',
                    code: 400,
                });
            }

            const order = await Order.findById(id);

            if (!order) {
                throw new AppServerError({
                    message: 'Заказ не найден',
                    code: 400,
                });
            }

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    },
    updateOrderStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const currentOrder = await Order.findById(id);
            if (!currentOrder) {
                throw new AppServerError({
                    message: 'Заказ не найден',
                    code: 400,
                });
            }

            const updatedOrder = await Order.updateStatus(id, status);

            if (!updatedOrder) {
                throw new AppServerError({
                    message: 'Ошибка при обновлении заказа',
                    code: 500,
                });
            }

            res.status(200).json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }
}