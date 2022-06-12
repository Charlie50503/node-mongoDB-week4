const User = require('../models/user')
const {successHandle} = require('../utils/successHandle')
const appError = require('../utils/appError')
const validator = require('validator')
const msg = require('../msg/msg')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { generateSendJWT } = require('../middleware/auth')
const {getTokenId} = require('../utils/token')
const users = {
  async get(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },
  async getProfile(req, res,next) {
    const userId = await getTokenId(req,res,next)
    const userData = await User.findById(userId)
    if(!userData) return next(appError('400', '取得失敗', next))
    successHandle(req, res, userData)
  },
  async patchProfile(req, res,next) {
    const { name, sex, photoUrl } = req.body
    const updateDate = {}
    if(name) updateDate.name = name
    if(sex) updateDate.sex = sex
    if(photoUrl) updateDate.photoUrl = photoUrl
    const userId = await getTokenId(req,res,next)
    const result = await User.findByIdAndUpdate(userId, { 
      ...updateDate,
      updateAt:Date()
    },
    { upsert: true, returnOriginal: false,
      runValidators :true })
    if(!result) return next(appError('400', '更新失敗', next))
    successHandle(req, res, result)
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

  async postUpdatePassword(req, res,next) {
    const { password } = req.body
    const bcryptPassword = await bcrypt.hash(password, 12)
    const userId = await getTokenId(req,res,next)
    const result = await User.findByIdAndUpdate(userId,{
      password:bcryptPassword
    },{
      runValidators: true 
    })
    if(!result) next(appError('400', '更新密碼不成功', next))
    const data = {
      message:'更新成功'
    }
    successHandle(req, res, data)
  },
}

module.exports = users
