var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const errorHandle = require('./services/errorHandle')
const {resErrorProd,resErrorDev} = require('./utils/errorHandle')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var postsRouter = require('./routes/posts')

var app = express()

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaught Exception！')
	console.error(err);
	process.exit(1);
});

//connect
require('./connections')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ status: 'error', message: '無此路由' })
  // next(createError(404));
})
// error handler
app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res)
  }

  //production
  if (err.name === 'ValidationError') {
    err.name = '資料欄位未填寫正確，請重新輸入'
    err.isOperational = true
    return resErrorProd(err, res)
  }
  resErrorProd(err, res)
})


process.on('unhandledRejection',(error,promise)=>{
  console.error('未捕捉到 rejection:',promise,'原因',error)
})

module.exports = app
