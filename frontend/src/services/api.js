const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
    async createOrder(data) {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status !== 200) {
            throw await response.json();
        }

        return await response.json();
    },
    async getOrderById(id) {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`);

        if (response.status !== 200) {
            throw await response.json();
        }

        return await response.json();
    },
    async updateOrderStatus(id, status) {
        const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.status !== 200) {
            throw await response.json();
        }

        return await response.json();
    }
};