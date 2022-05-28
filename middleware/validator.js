const validator = require('validator')
const { handleErrorAsync } = require('../utils/errorHandle')
const appError = require('../utils/appError')
const msg = require('../msg/msg')
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
}

module.exports = {
  Validator,
}
