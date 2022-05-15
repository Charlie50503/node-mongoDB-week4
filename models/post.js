const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref:'user',
    required: [true, 'user id 必填'],
  },
  content: {
    type: String,
    required: [true, 'content 必填'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false
})

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref:'user',
    required: [true, 'user id 必填'],
  },
  imgUrl: {
    type: String,
    default:'',
  },
  content: {
    type: String,
    required: [true, 'content 必填'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments:[commentSchema]
}, {
  versionKey: false
})

const Post = mongoose.model('post',postSchema)

module.exports = Post