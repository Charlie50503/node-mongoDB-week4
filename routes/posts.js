const express = require('express')
const router = express.Router()
const posts = require('../controllers/post')
const {handleErrorAsync} = require('../utils/errorHandle')
router.get('/',handleErrorAsync(posts.get))
router.post('/',handleErrorAsync(posts.post))
router.post('/comment/:postId',handleErrorAsync(posts.postComment))

module.exports = router;