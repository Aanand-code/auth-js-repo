const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected...')

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db...')
    })

    mongoose.connection.on('error', err => {
      console.error(`Mongoose connection error: ${err}`)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected...')
    })

    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('Mongoose disconnected due to app termination...')
      process.exit(0) // Exit process with success
    })
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
// const connectDB = require('./db');
