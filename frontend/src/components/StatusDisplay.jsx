import React from 'react';
import './StatusDisplay.css';

const StatusDisplay = ({ error, result }) => {
    return (
        <>
            {error && <div>{error}</div>}

            {result && (
                <div>
                    <h3>Информация о заказе</h3>
                    <p><b>ID:</b> { result.id }</p>
                    <p><b>Статус:</b> { result.status }</p>
                    <p><b>Email клиента:</b> { result.customer_email }</p>
                </div>
            ) }
        </>
    );
};

export default StatusDisplay;