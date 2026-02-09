class AppValidationError extends Error {
    constructor({ message }) {
        super(message);
    }
}

export default AppValidationError;