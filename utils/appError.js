const appError = (httpStatus,errMessage,next)=>{
  const error = new Error();
  error.statusCode = httpStatus
  error.isOperational = true;
  next(error)
}

module.exports = appError