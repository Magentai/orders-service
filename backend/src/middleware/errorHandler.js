const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    if (err.code === 500 || !err.code || isNaN(err.code)) {
        res.status(500);
        res.send('Внутренняя ошибка сервера');
    }
    else {
        res.status(err.code);
        res.send(err.message);
    }

}

export default errorHandler;