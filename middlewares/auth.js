const { verifyAccessToken } = require('../config/jwt')
const User = require('../models/User')
const ApiError = require('../utils/ApiError')

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from headers
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken
    }

    // Check if token is provided
    if (!token) {
      throw new ApiError(401, 'Not authorized, token not provided', true)
    }

    // Verify token
    const decoded = await verifyAccessToken(token)
    // Check if user exists in the database
    const user = await User.findById(decoded.id)
    if (!user) {
      throw new ApiError(401, 'Not authorized, token failed', true)
    }
    // Attach user to request object
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
