const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Exclude password from queries by default
  },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'moderrator'],
    default: ['user']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() // Skip hashing if password is not modified)
  this.password = await bcrypt.hash(this.password, 12) // Hash the password with a salt of 12 rounds
  next()
})

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
// const User = mongoose.model('User', userSchema);
// module.exports = User;
