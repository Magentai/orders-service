import AppServerError from '../classes/AppServerError.js';
import AppValidationError from '../classes/AppValidationError.js';

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppValidationError) {
        res.status(400);
        res.send(err.message);
        return;
    }

    if (err instanceof AppServerError) {
        res.status(err.code ?? 500);
        res.send('Внутренняя ошибка сервера');
        return;
    }

    if (err.code && !isNaN(err.code)) {
        res.status(err.code);
    } else {
        res.status(500);
    }
    res.send(err.message ?? 'Внутренняя ошибка сервера');
}

export default errorHandler;