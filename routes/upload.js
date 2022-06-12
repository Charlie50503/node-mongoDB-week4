const express = require('express')
const router = express.Router()
const posts = require('../controllers/post')
const {handleErrorAsync} = require('../utils/errorHandle')
const uploadImg = require('../controllers/upload')
const sizeOf = require('image-size');
const upload = require('../middleware/image');
const {isAuth} = require('../middleware/auth');
const {Validator} = require('../middleware/validator');
const appError = require('../utils/appError')
const {
  ImgurClient
} = require('imgur');
const {getTokenId} = require('../utils/token')
const path = require('path')
var multer = require('multer')({
  // dest: App.uploadsDir,
  limits: { fileSize: 2*1024*1024*1024 },
  fileFilter: (req, file, cb) => {
    // if (file.mimetype !== 'image/jpeg') {
    //   return cb(new Error('Only jpeg images allowed'))
    // }
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext !=='.jpg' && ext !=='.png' && ext !=='.jpeg'){
      cb(new Error("檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。"))
    }
    console.log("this");
    cb(null, true)
  }
})
var avatarUpload = multer.single('avatar')

router.post('/',isAuth,
(req, res,next) => {
  avatarUpload(req, res, (err) => {
    console.log("err",err);
    if (err) return next(appError(400,"invalid_file",next))
    
    console.log('save the file', req.file)
    next()
  })
}
,handleErrorAsync(uploadImg.image))

module.exports = router;