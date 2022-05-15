const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email 必填'],
    select: false,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password 必填'],
    select: false,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, 'name 必填'],
  },
  photoUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false
})

const User = mongoose.model('user', userSchema)

module.exports = User