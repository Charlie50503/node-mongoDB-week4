const express = require('express')
const router = express.Router()
const posts = require('../controllers/post')
const {isAuth} = require('../middleware/auth');
const {handleErrorAsync} = require('../utils/errorHandle')
router.get('/',isAuth,handleErrorAsync(posts.get))
router.post('/',isAuth,handleErrorAsync(posts.post))
router.post('/comment/:postId',isAuth,handleErrorAsync(posts.postComment))

module.exports = router;
