const User = require('../models/user')
const {successHandle} = require('../services/successHandle')
const appError = require('../utils/appError')
const validator = require('validator')
const msg = require('../msg/msg')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { generateSendJWT } = require('../middleware/auth')
const users = {
  async get(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },
  async getProfile(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },
  async patchProfile(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },

  async postSignUp(req, res, next) {
    const { email, password, name } = req.body
    const bcryptPassword = await bcrypt.hash(password, 12)
    let newUser
    try {
      newUser = await User.create({
        email,
        password: bcryptPassword,
        name,
      })
    } catch (error) {
      if (error.code === 11000) {
        return next(appError('400', '已註冊此用戶', next))
      }
      return next(appError('400', '不明原因錯誤', next))
    }
    generateSendJWT(newUser, 201, res)
  },

  async postSignIn(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({
      email
    }).select('+password');
    if (!user) {
      return next(appError('400', '不存在該筆資料',next));
    }
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError('400','您的密碼不正確',next));
    }
    generateSendJWT(user, 201, res)
  },
  async postUpdatePassword(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },
}

module.exports = users
