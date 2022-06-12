const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const { handleErrorAsync } = require('../utils/errorHandle')
const express = require('express')
const msg = require('../msg/msg')
const checkRequestBodyJsonFormatter = (err, req, res, next) => {
  console.log("asd");
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.log("asd");
    console.error(err);
    return next(appError(401, msg.jsonFormatterNotCorrect, next))
}
next();
}


module.exports = {
  checkRequestBodyJsonFormatter,
}