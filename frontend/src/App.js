import React from 'react';
import OrderCreateForm from './sections/OrderCreateForm';
import OrderGetForm from './sections/OrderGetForm';
import OrderUpdateForm from './sections/OrderUpdateForm';

function App() {
    return (
        <div className="App">
            <OrderCreateForm />
            <OrderGetForm />
            <OrderUpdateForm />
        </div>
    );
}

export default App;