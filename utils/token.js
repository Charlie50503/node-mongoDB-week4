const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const { handleErrorAsync } = require('../utils/errorHandle')
const msg = require('../msg/msg')

const getTokenId = async (req,res,next) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.replace('Bearer ', '')
    }
  
    if (!token) {
      return next(appError(401, msg.notLoginIn, next))
    }
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
          // reject(error)
          return next(appError(401, msg.tokenIsNotCorrect, next))
        } else {
          resolve(payload)
        }
      })
    })
    return decoded.id
} 

module.exports = { getTokenId }