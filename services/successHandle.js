const successHandle = (req,res,data)=>{
  res.status(200).json(
    {
      "status":"success",
      data
    }
  )
  res.end()
}

module.exports = successHandle