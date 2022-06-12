const appError = require('../utils/appError')
const path = require('path')
const multer = require('multer')
const msg = require('../msg/msg')

const multerErrorCodeMsg = {
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FILE_SIZE: '圖片size太大',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
  LIMIT_UNEXPECTED_FILE: '上傳格式錯誤或是文件數量不對或是其他錯誤',
}

const multerSettings = {
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'))
    }
    console.log('this')
    cb(null, true)
  },
}

const avatarUpload = multer(multerSettings).single('avatar')

const uploadOneImg = async (req, res, next) => {
  avatarUpload(req, res, function (err) {
    console.log(err)
    if (
      err instanceof multer.MulterError &&
      multerErrorCodeMsg.hasOwnProperty(err.code)
    ) {
      return next(appError(400, multerErrorCodeMsg[err.code], next))
    } else if (err) {
      return next(appError(500, msg.failUploadImg, next))
    }
    next()
  })
}

module.exports = { uploadOneImg }
