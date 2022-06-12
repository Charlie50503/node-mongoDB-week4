const validator = require('validator')
const { handleErrorAsync } = require('../utils/errorHandle')
const appError = require('../utils/appError')
const msg = require('../msg/msg')
const {utilsValidation} = require('../utils/validation')
class Validator {
  static checkSignUp = handleErrorAsync(async (req, res, next) => {
    const { email, password, confirmPassword, name } = req.body

    if (!email || !password || !confirmPassword || !name) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if (password !== confirmPassword) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if (!validator.isLength(password, { min: 8 })) {
      return next(appError('400', msg.passwordLengthNotMatch, next))
    }
    if (validator.isNumeric(password) || validator.isAlpha(password)) {
      return next(appError('400', msg.passwordNotMatchEnglishAndNumber ,next))
    }
    if(validator.isStrongPassword(password,{returnScore :true})  <= 20){
      return next(appError('400',msg.passwordNotString, next))
    }
    if (!validator.isEmail(email)) {
      return next(appError('400', msg.emailFormatNotCorrect, next))
    }

    next()
  })

  static checkSignIn = handleErrorAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if (!validator.isLength(password, { min: 8 })) {
      return next(appError('400', msg.passwordLengthNotMatch, next))
    }
    if (validator.isNumeric(password) || validator.isAlpha(password)) {
      return next(appError('400', msg.passwordNotMatchEnglishAndNumber ,next))
    }
    if(validator.isStrongPassword(password,{returnScore :true})  <= 20){
      return next(appError('400',msg.passwordNotString, next))
    }
    if (!validator.isEmail(email)) {
      return next(appError('400', msg.emailFormatNotCorrect, next))
    }

    next()
  })

  static checkUpdatePassword = handleErrorAsync(async (req, res, next) => {
    const { password, confirmPassword } = req.body
    if (!password || !confirmPassword) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if (password !== confirmPassword) {
      return next(appError('400', msg.passwordNotMatch, next))
    }

    next()
  })

  static checkUpdateProfile = handleErrorAsync(async (req, res, next) => {
    const { name, sex, photoUrl } = req.body
    if(name && !utilsValidation.isName(name)) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if(sex && !utilsValidation.isSex(sex)) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    if(sex!=="male" && sex!=="female"){
      return next(appError('400', msg.sexInputTypeError, next))
    }
    
    if(photoUrl && !utilsValidation.isPhotoUrl(photoUrl)) {
      return next(appError('400', msg.fieldNotCorrect, next))
    }
    next()
  })
}

module.exports = {
  Validator,
}
