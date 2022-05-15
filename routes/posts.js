const express = require('express')
const router = express.Router()
const posts = require('../controllers/post')

router.get('/',posts.get)
router.post('/',posts.post)
router.post('/comment/:postId',posts.postComment)

module.exports = router;