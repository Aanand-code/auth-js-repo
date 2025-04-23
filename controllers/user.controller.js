const User = require('../models/User');
const ApiError = require('../utils/ApiError');

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
