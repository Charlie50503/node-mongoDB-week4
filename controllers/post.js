const Post = require('../models/post')
const appError = require('../utils/appError')
const {successHandle} = require('../utils/successHandle')
const {utilsValidation} = require('../utils/validation')
const {getTokenId} = require('../utils/token')

const posts = {
  async get(req,res,next){
    const postData = await Post.find().populate({
      path: 'user',
      select:"name photoUrl"
    })
    successHandle(req,res,postData)
  },

  async post(req,res,next){
    const { body } = req

    const userId = await getTokenId(req,res,next)
    if(!utilsValidation.isImgUrl(body.imgUrl)){
      return next(appError('400',"沒有正確的 img url",next))
    }
    if(!utilsValidation.isContent(body.content)){
      return next(appError('400',"沒有正確的 content",next))
    }
    if(!utilsValidation.isLikes(body.likes)){
      return next(appError('400',"沒有正確的 likes",next))
    }
    const postData = {
      user:userId,
      content:body.content,
      imgUrl:body.imgUrl,
      likes:body.likes
    }
    const result = await Post.create(postData)
    successHandle(req,res,result)
  },

  async postComment(req,res){
    const {postId}= req.params
    if(!postId) next(appError('400',"沒有 post id",next))
    const reqBody =req.body
    if(!utilsValidation.isUserId(reqBody.userId)){
      return next(appError('400',"沒有正確的 user id",next))
    }
    if(!utilsValidation.isContent(reqBody.content)){
      return next(appError('400',"沒有正確的 content",next))
    }
    if(!utilsValidation.isLikes(reqBody.likes)){
      return next(appError('400',"沒有正確的 likes",next))
    }
    
    let result = await Post.findByIdAndUpdate(postId, {$push: {
      "comments":{
        user: reqBody.userId,
        content: reqBody.content,
        likes: reqBody.likes,
      }
    }},
    { runValidators: true })
    let findResult =await Post.findById(postId)
    if(!result) next(appError('400',"沒有找到貼文",next))
    successHandle(req,res,findResult)
  }

}



module.exports = posts;
