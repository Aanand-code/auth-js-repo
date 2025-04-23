const ApiError = require('../utils/ApiError');

// convert error to ApiError

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode =
      err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
    const message = err.message || 'Internal Server Error';
    err = new ApiError(statusCode, message, false, err.stack);
  }
  next(err);
};

// handle error
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  // hide internal error details in production
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  //log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};
