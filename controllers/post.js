const Post = require('../models/post')
const errorHandle = require('../services/errorHandle')
const successHandle = require('../services/successHandle')
const {
  isUserId,
  isImgUrl,
  isContent,
  isLikes
} = require('../utils/validation')


const posts = {
  async get(req,res){
    const postData = await Post.find().populate({
      path: 'user',
      select:"name photoUrl"
    })
    successHandle(req,res,postData)
  },

  async post(req,res){
    const { body } = req

    if(!isUserId(body.userId)){
      return errorHandle(req,res,"沒有正確的 user id")
    }
    if(!isImgUrl(body.imgUrl)){
      return errorHandle(req,res,"沒有正確的 img url")
    }
    if(!isContent(body.content)){
      return errorHandle(req,res,"沒有正確的 content")
    }
    if(!isLikes(body.likes)){
      return errorHandle(req,res,"沒有正確的 likes")
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
    if(!postId) errorHandle(req,res,"沒有 post id")
    const reqBody =req.body
    if(!isUserId(reqBody.userId)){
      return errorHandle(req,res,"沒有正確的 user id")
    }
    if(!isContent(reqBody.content)){
      return errorHandle(req,res,"沒有正確的 content")
    }
    if(!isLikes(reqBody.likes)){
      return errorHandle(req,res,"沒有正確的 likes")
    }
    
    let result = await Post.findByIdAndUpdate(postId, {$push: {
      "comments":{
        user: reqBody.userId,
        content: reqBody.content,
        likes: reqBody.likes,
      }
    }})
    let findResult =await Post.findById(postId)
    if(!result) errorHandle(req,res,"沒有找到貼文")
    successHandle(req,res,findResult)
  }

}



module.exports = posts;
