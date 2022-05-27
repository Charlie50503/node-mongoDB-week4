const appError = (httpStatus,errMessage,next)=>{
  const error = new Error();
  error.statusCode = httpStatus
  error.isOperational = true;
  error.message = errMessage
  next(error)
}

module.exports = appError