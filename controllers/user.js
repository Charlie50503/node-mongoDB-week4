const User = require('../models/user')
const successHandle = require('../services/successHandle')


const users = {
  async get(req,res){
    const userData = await User.find()
    successHandle(req,res,userData)
  }
}

module.exports = users;
