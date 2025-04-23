const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { authenticate, authorize } = require('../middlewares/auth')

// Protected routes
router.use(authenticate) // Apply authentication middleware to all routes below this line

router.get('/me', userController.getMe) // Get current user information
router.patch('/me', userController.updateMe) // Update current user information

// // Admin routes
// router.get('/', authorize('admin'), userController.getAllUsers); // Apply authorization middleware for admin routes
// router.delete('/:id', authorize('admin'), userController.deleteUser); // Delete a user by ID

module.exports = router
