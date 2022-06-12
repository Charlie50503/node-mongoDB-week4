const User = require('../models/user')
const {successHandle} = require('../utils/successHandle')
const appError = require('../utils/appError')
const validator = require('validator')
const msg = require('../msg/msg')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { generateSendJWT } = require('../middleware/auth')
const {getTokenId} = require('../utils/token')
const sizeOf = require('image-size');
const {
  ImgurClient
} = require('imgur');
const upload = {
  async image(req, res,next) {
    console.log(req);
    console.log(req.file.fieldname);
    if(req.files.length <= 0){
      return next(appError(400,"尚未上傳檔案",next))
    }
    const dimensions = sizeOf(req.files[0].buffer)
    // if(dimensions.width !== dimensions.height) {
    //   return next(appError(400,"圖片長寬不符合1:1 尺寸",next))
    // }
    const client = new ImgurClient({
      clientId:process.env.IMGUR_CLIENT_ID,
      clientSecret:process.env.IMGUR_CLIENT_SECRET,
      refreshToken:process.env.IMGUR_REFRESH_TOKEN
    })

    const response = await client.upload({
      image:req.files[0].buffer.toString('base64'),
      type:'base64',
      album:process.env.IMGUR_ALBUM_ID
    })

    successHandle(req,res,{
      imgUrl:response.data.link
    })
  }
}


module.exports = upload;