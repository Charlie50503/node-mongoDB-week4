const Post = require('../models/post')
const appError = require('../utils/appError')
const {successHandle} = require('../services/successHandle')
const {
  isUserId,
  isImgUrl,
  isContent,
  isLikes
} = require('../utils/validation')


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

    if(!isUserId(body.userId)){
      return next(appError('400',"沒有正確的 user id",next))
    }
    if(!isImgUrl(body.imgUrl)){
      return next(appError('400',"沒有正確的 img url",next))
    }
    if(!isContent(body.content)){
      return next(appError('400',"沒有正確的 content",next))
    }
    if(!isLikes(body.likes)){
      return next(appError('400',"沒有正確的 likes",next))
    }
    const postData = {
      user:body.userId,
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
    if(!isUserId(reqBody.userId)){
      return next(appError('400',"沒有正確的 user id",next))
    }
    if(!isContent(reqBody.content)){
      return next(appError('400',"沒有正確的 content",next))
    }
    if(!isLikes(reqBody.likes)){
      return next(appError('400',"沒有正確的 likes",next))
    }
    
    let result = await Post.findByIdAndUpdate(postId, {$push: {
      "comments":{
        user: reqBody.userId,
        content: reqBody.content,
        likes: reqBody.likes,
      }
    }})
    let findResult =await Post.findById(postId)
    if(!result) next(appError('400',"沒有找到貼文",next))
    successHandle(req,res,findResult)
  }

}



module.exports = posts;
