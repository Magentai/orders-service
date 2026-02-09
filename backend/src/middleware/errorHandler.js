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
        res.status(500);
        res.send('Внутренняя ошибка сервера');
        return;
    }

    if (!err.code || isNaN(err.code)) {
        res.status(500);
        res.send('Внутренняя ошибка сервера');
        return;
    } else {
        res.status(err.code);
        res.send(err.message);
        return;
    }

}

export default errorHandler;