class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
// Usage example
// const ApiError = require('./path/to/ApiError');
// const error = new ApiError(404, 'Resource not found', true);
// console.log(error.statusCode); // 404
