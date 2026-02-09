import React, { useState } from 'react';
import { api } from '../services/api';
import StatusDisplay from '../components/StatusDisplay';
import './OrderUpdateForm.css';

const OrderUpdateForm = () => {
    // const [id, setId] = useState('');
    // const [error, setError] = useState('');
    // const [result, setResult] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setResult(null);
    //     setIsLoading(true);
    //
    //     api.getOrderById(id)
    //         .then(response => {
    //             console.log(response);
    //             setResult({
    //                 id: response.order.id,
    //                 status: response.order.status,
    //                 customer_email: response.order.customer_email,
    //             })
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setError(error || 'Ошибка при создании заказа');
    //         })
    //         .finally(() => setIsLoading(false));
    // };

    return (
        <div>
            {/*<h1>Получение информации о заказе</h1>*/}

            {/*<StatusDisplay error={error} result={result} />*/}

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="id">ID заказа (обязательно)</label>*/}
            {/*        <input*/}
            {/*            id="id"*/}
            {/*            value={id}*/}
            {/*            onChange={(event) => setId(event.target.value)}*/}
            {/*            required*/}
            {/*            placeholder="00000000-0000-0000-0000-000000000000"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <button type="submit" disabled={isLoading}>*/}
            {/*        Поиск*/}
            {/*    </button>*/}
            {/*</form>*/}
        </div>
    );
};

export default OrderUpdateForm;