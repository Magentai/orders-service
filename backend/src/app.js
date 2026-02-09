import express from 'express';
import cors from 'cors';
import ordersRoutes from './routes/orders.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ordersRoutes);

app.get('/healthcheck', (req, res) => {
    res.json({ ok: true, message: 'Service is running' });
});

app.use(errorHandler);

export default app;