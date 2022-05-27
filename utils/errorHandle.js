const handleErrorAsync = function (func){
  // func 先將 async fun 帶入參數儲存
  // middleware 先接住 router 資料
  return function(req,res,next){
    func(req,res,next).catch(
      function(error){
        return next(error)
      }
    )
  }
}
// 開發環境錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const resErrorProd  = (err,res) => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      message:err.message
    })
  }else {
    console.error('出現重大錯誤',err)
    res.status(500).json({
      status:'error',
      message:'系統錯誤，請洽管理員'
    })
  }
}

module.exports = {handleErrorAsync,resErrorProd,resErrorDev};