const User = require('../models/user')
const successHandle = require('../services/successHandle')
const appError = require('../utils/appError')
const validator = require('validator');
const msg = require('../msg/msg');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {generateSendJWT} = require('../middleware/auth');
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
  async postSignUp(req, res,next) {
    const { email, password, confirmPassword, name } = req.body
    
    if (!email || !password || !confirmPassword || !name) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if(password!==confirmPassword){
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if(!validator.isLength(password,{min:8})){
      return next(appError('400', msg.passwordLengthNotMatch, next))
    }
    if(!validator.isEmail(email)){
      return next(appError('400',msg.emailFormatNotCorrect,next))
    }

    const bcryptPassword = await bcrypt.hash(req.body.password,12)
    try {
      const newUser = await User.create({
        email,
        password:bcryptPassword,
        name
      })
    } catch (error) {
      if (error.code === 11000) {
        return next(appError('400','已註冊此用戶',next))
      }
      return next(appError('400', '不明原因錯誤',next))
    }
    generateSendJWT(newUser,201,res)
  },
  async postSignIn(req, res,next) {
    const { email, password } = req.body
    
    if (!email || !password) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if(!validator.isLength(password,{min:8})){
      return next(appError('400', msg.passwordLengthNotMatch, next))
    }
    if(!validator.isEmail(email)){
      return next(appError('400',msg.emailFormatNotCorrect,next))
    }
    const user = await User.findOne({email}).select('+password')
    console.log("user",user);
    const auth = await bcrypt.compare(password,user.password)
    console.log("auth",auth);
    if(!auth){
      return next(appError(400,msg.passwordNotCorrect,next))
    }
    generateSendJWT(newUser,201,res)
  },
  async postUpdatePassword(req, res) {
    const userData = await User.find()
    successHandle(req, res, userData)
  },
}

module.exports = users
