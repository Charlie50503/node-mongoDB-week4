const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const { handleErrorAsync } = require('../utils/errorHandle')
const express = require('express')
const User = require('../models/user')
const msg = require('../msg/msg')
const isAuth = handleErrorAsync(async (req, res, next) => {
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
        reject(error)
      } else {
        resolve(payload)
      }
    })
  })
  console.log("decoded",decoded);
  const currentUser = await User.findById(decoded.id)

  req.user = currentUser

  next()
})

const generateSendJWT = (user,statusCode,res) =>{
  const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_DAY
  })
  user.password = undefined;
  res.status(statusCode).json({
    status:'success',
    user:{
      token,
      name:user.name
    }
  })
}

module.exports = {
  isAuth,
  generateSendJWT
}