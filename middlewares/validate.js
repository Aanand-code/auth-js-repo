const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      [err.param]: err.msg,
    }));
    next(new ApiError(422, 'Validation Error', true, extractedErrors));
  };
};
