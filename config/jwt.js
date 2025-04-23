const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
  generateAccessToken: (userId, roles) => {
    return jwt.sign({ id: userId, roles }, accessTokenSecret, {
      expiresIn: '15m',
    });
  },

  generateRefreshToken: (userId) => {
    return jwt.sign({ id: userId }, refreshTokenSecret, { expiresIn: '7d' });
  },

  verifyAccessToken: (token) => {
    return jwt.verify(token, accessTokenSecret);
  },

  verifyRefreshToken: (token) => {
    return jwt.verify(token, refreshTokenSecret);
  },
};
