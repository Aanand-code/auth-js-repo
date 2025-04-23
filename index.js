require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const ApiError = require('./utils/ApiError')
const connectDB = require('./config/db')
const { errorConverter, errorHandler } = require('./middlewares/error')

// Import routes
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

// Initialize express app
const app = express()

// Database connection
connectDB()

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Handle 404 error
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'))
})

// Error handling middleware
app.use(errorConverter)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
