import React from 'react';
import './StatusDisplay.css';

const StatusDisplay = ({ error, result }) => {
    return (
        <>
            {error && <div className="error-label">{error.message}</div>}

            {result && (
                <section className="order-data">
                    <h3 className="order-data__title">Информация о заказе</h3>
                    {result.id && <div><b>ID:</b> { result.id }</div>}
                    {result.status && <div><b>Статус:</b> { result.status }</div>}
                    {result.customer_email && <div><b>Email клиента:</b> { result.customer_email }</div>}
                    {result.items && <div><b>Состав заказа:</b> { result.items.map(item => JSON.stringify(item)) }</div>}
                    {result.created_at && <div><b>Дата создания:</b> { result.created_at }</div>}
                </section>
            ) }
        </>
    );
};

export default StatusDisplay;