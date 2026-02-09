import validator from 'validator';
import AppValidationError from '../classes/AppValidationError.js';

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

const validateUpdateStatus = (req, res, next) => {
    const { status } = req.body;

    let errors = [];

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

const validateStatusTransition = (currentStatus, newStatus) => {
    const transitions = {
        'new': ['processed', 'canceled'],
        'processed': ['canceled'],
        'canceled': []
    };

    if (!transitions[currentStatus].includes(newStatus)) {
        throw new AppValidationError({ message: 'Некорректный переход статуса' });
    }
};

export default {
    validateCreateOrder,
    validateUpdateStatus,
    validateStatusTransition
};