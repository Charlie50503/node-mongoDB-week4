const successHandle = (req,res,data)=>{
  res.status(200).json(
    {
      "status":"success",
      data
    }
  )
  res.end()
}
const getHttpResponse = (statusCode=200,{data}) => {
  const result = { status: 'success' };
  if (data) result.data = data;
  res.status(statusCode).json(result)
  res.end()
};
module.exports = {getHttpResponse,successHandle}