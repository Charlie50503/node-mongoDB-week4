const express = require('express')
const router = express.Router()
const {handleErrorAsync} = require('../utils/errorHandle')
const uploadImg = require('../controllers/upload')
const {isAuth} = require('../middleware/auth');
const {uploadOneImg} = require('../middleware/image');

router.post('/',isAuth,
handleErrorAsync(uploadOneImg)
,handleErrorAsync(uploadImg.image))

module.exports = router;