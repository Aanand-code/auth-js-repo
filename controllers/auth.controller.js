const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { generateAccessToken, generateRefreshToken } = require('../config/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new ApiError(400, 'Username or email already exists');
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.roles);
    const refreshToken = generateRefreshToken(user._id);

    // omit password from the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Send response
    res.status(201).json({
      user: userWithoutPassword,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.roles);
    const refreshToken = generateRefreshToken(user._id);

    // omit password from the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Send response
    res.json({
      user: userWithoutPassword,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    // Generate new tokens
    const accessToken = generateAccessToken(user._id, user.roles);
    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};
