import db from '../../config/database.js';
import { v4 } from 'uuid';
import validator from '../middleware/validation.js';

class Order {
    static async create(customer_email, items) {
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const generatedId = v4();
            const createdAt = new Date();

            // Создаем заказ
            await connection.execute(
                'INSERT INTO `order` (id, customer_email, status, created_at) VALUES (?, ?, ?, ?)',
                [generatedId, customer_email, 'new', createdAt]
            );

            // Создаем позиции заказа
            const itemValues = items.map(item => [v4(), generatedId, item.sku, item.qty]);

            await connection.query(
                'INSERT INTO order_item (id, order_id, sku, qty) VALUES ?',
                [itemValues]
            );

            await connection.commit();

            return await this.findById(generatedId);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findById(id) {
        // Получаем заказ
        const [orders] = await db.execute(
            'SELECT id, customer_email, status, created_at FROM `order` WHERE id = ?',
            [id]
        );

        if (orders.length === 0) {
            return null;
        }

        const order = orders[0];

        // Получаем позиции заказа
        const [items] = await db.execute(
            'SELECT sku, qty FROM order_item WHERE order_id = ?',
            [id]
        );

        return {
            ...order,
            items: items
        };
    }

    static async updateStatus(id, status) {
        // Получаем текущий статус
        const [orders] = await db.execute(
            'SELECT status FROM `order` WHERE id = ?',
            [id]
        );

        if (orders.length === 0) {
            return null;
        }

        const currentStatus = orders[0].status;

        // Проверяем валидность перехода статуса
        validator.isStatusTransitionValid(currentStatus, status);

        // Обновляем статус
        const [result] = await db.execute(
            'UPDATE `order` SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        // Получаем обновленный заказ
        return await this.findById(id);
    }
}

export default Order;