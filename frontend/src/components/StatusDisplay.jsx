import React from 'react';
import './StatusDisplay.css';

const StatusDisplay = ({ error, result }) => {
    return (
        <>
            {error && <div className="error-label">{error}</div>}

            {result && (
                <section className="order-data">
                    <h3 className="order-data__title">Информация о заказе</h3>
                    <div><b>ID:</b> { result.id }</div>
                    <div><b>Статус:</b> { result.status }</div>
                    <div><b>Email клиента:</b> { result.customer_email }</div>
                </section>
            ) }
        </>
    );
};

export default StatusDisplay;