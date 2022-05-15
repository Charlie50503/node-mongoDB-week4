const errorHandle = (req,res,message)=>{
  res.status(400).json(
    {
      "status":false,
      message
    }
  )
  res.end()
}

module.exports = errorHandle