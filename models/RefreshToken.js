const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
  },
});

refreshTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 } // Automatically remove expired tokens
);
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;
