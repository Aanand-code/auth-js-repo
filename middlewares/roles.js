const ApiError = require('../utils/ApiError');

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // Assuming user is set in req by authentication middleware

    if (!user) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    const hasRole = user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return next(new ApiError(403, 'Forbidden'));
    }

    next();
  };
};
