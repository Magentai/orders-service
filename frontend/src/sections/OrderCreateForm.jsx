import React, { useState } from 'react';
import { api } from '../services/api';
import StatusDisplay from '../components/StatusDisplay';
import './OrderCreateForm.css';

const OrderCreateForm = () => {
    const [email, setEmail] = useState('');
    const [items, setItems] = useState([{ sku: '', qty: 1 }]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const addItem = () => {
        setItems([...items, { sku: '', qty: 1 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];

        if (field === 'qty') {
            newItems[index][field] = parseInt(value) || 1;
        }

        if (field === 'sku') {
            newItems[index][field] = value;
        }

        setItems(newItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setResult(null);
        setIsLoading(true);

        const orderData = {
            customer_email: email,
            items: items.filter(item => item.sku.trim() !== '')
        };

        if (orderData.items.length === 0) {
            throw { message: 'Заполните хотя бы один SKU' };
        }

        api.createOrder(orderData)
            .then(response => {
                setResult({
                    id: response.id,
                    status: response.status,
                    customer_email: response.customer_email,
                })
            })
            .catch(error => {
                console.error(error);
                setError(error || 'Ошибка при создании заказа');
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Создание заказа</h1>

            <StatusDisplay error={error} result={result} />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email клиента (обязательно)</label><br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        placeholder="example@example.com"
                    />
                </div>

                <div>
                    <label>Состав заказа (обязательно)</label>
                    <div className="items-grid">
                        {items.map((item, index) => (
                            <div className="items-grid__row" key={index}>
                                <input
                                    type="text"
                                    placeholder="SKU"
                                    value={ item.sku }
                                    onChange={ (event) => updateItem(index, 'sku', event.target.value) }
                                    style={ { flex: 1 } }
                                />
                                <input
                                    type="number"
                                    placeholder="Количество"
                                    value={ item.qty }
                                    onChange={ (event) => updateItem(index, 'qty', event.target.value) }
                                    min="1"
                                />
                                <button
                                    type="button"
                                    onClick={ () => removeItem(index) }
                                    disabled={ items.length === 1 }>
                                    Удалить
                                </button>
                            </div>
                        )) }
                        <button
                            type="button"
                            onClick={ addItem }>
                            + Добавить
                        </button>
                    </div>
                </div>

                <button
                    className="submit-button"
                    type="submit"
                    disabled={ isLoading }>
                    Создать заказ
                </button>
            </form>
        </div>
    );
};

export default OrderCreateForm;