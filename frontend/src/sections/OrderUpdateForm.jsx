import React, { useState } from 'react';
import { api } from '../services/api';
import StatusDisplay from '../components/StatusDisplay';

const OrderUpdateForm = () => {
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [transitions] = useState({
        'new': ['processed', 'canceled'],
        'processed': ['canceled'],
        'canceled': []
    });

    const handleSearch = async (event) => {
        event.preventDefault();
        setError('');
        setResult(null);
        setIsLoading(true);

        api.getOrderById(id)
            .then(response => {
                setResult({
                    id: response.id,
                    status: response.status,
                    customer_email: response.customer_email,
                });
                if (response.status !== 'canceled') {
                    setStatus(transitions[response.status][0]);
                }
            })
            .catch(error => {
                console.error(error);
                setError(error || 'Ошибка при создании заказа');
            })
            .finally(() => setIsLoading(false));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);

        api.updateOrderStatus(id, status)
            .then(response => {
                setResult({
                    id: response.id,
                    status: response.status,
                    customer_email: response.customer_email,
                });
                if (response.status !== 'canceled') {
                    setStatus(transitions[response.status][0]);
                }
            })
            .catch(error => {
                console.error(error);
                setError(error || 'Ошибка при редактировании заказа');
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Редактирование заказа</h1>

            <StatusDisplay
                error={ error }
                result={ result } />

            <form onSubmit={ handleSearch }>
                <div>
                    <label htmlFor="id">ID заказа (обязательно)</label><br />
                    <input
                        id="id"
                        value={ id }
                        onChange={ (event) => setId(event.target.value) }
                        required
                        placeholder="00000000-0000-0000-0000-000000000000"
                    />
                </div>

                <button
                    type="submit"
                    disabled={ isLoading }>
                    Поиск
                </button>
            </form>

            { result?.status && result.status === 'canceled' && 'Заказ отменен. Редактирование невозможно' }

            { result?.status && result.status !== 'canceled' && <form onSubmit={ handleUpdate }>
                <div>
                    <label htmlFor="status">Новый статус заказа</label><br />
                    <select
                        id="status"
                        name="status"
                        value={ status }
                        onChange={ (event) => setStatus(event.target.value) }
                    >
                        { transitions[result.status].map((item, index) => <option value={ item } key={ index }>{ item }</option>) }
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={ isLoading }>
                    Сохранить
                </button>
            </form> }
        </div>
    );
};

export default OrderUpdateForm;