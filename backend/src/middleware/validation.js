import validator from 'validator';
import AppValidationError from '../classes/AppValidationError.js';
import * as uuid from 'uuid';

// Базовая проверка
const validate = ({ value, valueLabel = 'Поле', valueType = 'string' }) => {
    let errors = [];

    if (!value) {
        errors.push(`Поле ${valueLabel} должно быть заполнено`)
    } else {
        if (valueType && typeof value !== valueType) {
            errors.push(`Поле ${valueLabel} должно иметь тип ${valueType}`)
        }
    }

    return errors;
}

// Проверка запроса создания заказа
const validateCreateOrder = (req, res, next) => {
    const { customer_email, items } = req.body;

    let errors = [];

    errors.push(...validate({
        value: customer_email,
        valueLabel: 'Email клиента',
    }))

    if (!validator.isEmail(customer_email)) {
        errors.push('Поле Email клиента должно быть корректным email-адресом')
    }

    // Проверка items
    errors.push(...validate({
        value: items,
        valueLabel: 'Массив заказов',
        valueType: null
    }));

    if (!Array.isArray(items)) {
        errors.push('Поле Массив заказов должно иметь тип Массив')
    } else {
        if (items.length === 0) {
            errors.push('Поле Массив заказов должно иметь хотя бы один элемент')
        }
    }

    // Проверка каждой позиции
    for (let item of items) {
        errors.push(...validate({
            value: item.sku,
            valueLabel: `SKU позиции ${item.sku}`,
            valueType: 'string'
        }));

        errors.push(...validate({
            value: item.qty,
            valueLabel: `Количество позиции ${item.sku}`,
            valueType: 'number'
        }));

        if (!Number.isInteger(item.qty)) {
            errors.push('Поле Количество позиции должно быть корректным целым числом');
        }
        if (item.qty <= 0 ) {
            errors.push('Поле Количество позиции должно быть больше нуля');
        }
    }

    if (errors.length) {
        throw new AppValidationError({ message: errors.join('; ') });
    }

    next();
};

// Проверка запроса обновления статуса заказа
const validateUpdateOrderStatus = (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    let errors = [];

    if (!uuid.validate(id)) {
        errors.push(`Поле ID должно иметь корректный формат UUID`);
    }

    errors.push(...validate({
        value: status,
        valueLabel: `Статус заказа`,
        valueType: 'string'
    }));

    const validStatuses = ['new', 'processed', 'canceled'];
    if (!validStatuses.includes(status)) {
        errors.push(`Поле Статус заказа должно иметь одно из значений: ${validStatuses.join(', ')}`);
    }

    if (errors.length) {
        throw new AppValidationError({ message: errors.join('; ') });
    }

    next();
};

// Метод для проверки перехода статуса
const isStatusTransitionValid = (currentStatus, newStatus) => {
    const transitions = {
        'new': ['processed', 'canceled'],
        'processed': ['canceled'],
        'canceled': []
    };

    if (!transitions[currentStatus].includes(newStatus)) {
        throw new AppValidationError({ message: 'Некорректный переход статуса' });
    }
};

// Проверка запроса получения заказа по ID
const validateGetOrderById = (req, res, next) => {
    let errors = [];

    const { id } = req.params;

    if (!isIdValid(id)) {
        errors.push(`Поле ID должно иметь корректный формат UUID`);
    }

    if (errors.length) {
        throw new AppValidationError({ message: errors.join('; ') });
    }

    next();
}

// Метод для проверки ID
const isIdValid = (id) => {
    return uuid.validate(id);
}

export default {
    validateCreateOrder,
    validateUpdateOrderStatus,
    isStatusTransitionValid,
    validateGetOrderById,
    isIdValid
};