const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate');
const {
  registerSchema,
  loginSchema,
} = require('../validations/auth.validation');

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

router.post('/refresh-token', authController.refreshToken);

module.exports = router;
// This code defines the routes for user authentication in an Express application. It includes routes for user registration, login, and refreshing tokens. The routes use validation middleware to ensure that the incoming requests meet the required schema before proceeding to the controller functions. The controller functions handle the actual logic for each route, such as creating a new user or generating tokens.
// The code also imports necessary modules and middleware for validation and error handling. The routes are then exported for use in the main application file.
// The code is structured to follow best practices in Express.js, including the use of middleware for validation and separation of concerns by keeping the route definitions separate from the controller logic. This makes the code more maintainable and easier to understand.
