//モジュールの読み込み
var nodemailer = require('nodemailer')

// メール送信
/**
 * @param {Object} messageForm 寄信格式，包含寄件人、收件人、郵件內容
 * @param {String} messageForm.from 寄件人mail
 * @param {String} messageForm.to 收件人mail
 * @param {String} messageForm.subject 郵件主旨
 * @param {String} messageForm.text 郵件內容
 */
const sendMail = (messageForm) =>
  new Promise((resolve, reject) => {
    const { NODEMAILER_USER, NODEMAILER_PASSWORD, NODEMAILER_FROM_MAIL } =
      process.env
    //SMTPサーバの設定
    const smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
      },
    }
    const smtp = nodemailer.createTransport(smtpConfig)
    messageForm.from = NODEMAILER_FROM_MAIL
    try {
      smtp.sendMail(messageForm, function (error, info) {
        // エラー発生時
        if (error) {
          return reject({
            statusCode: 400,
            error,
          })
        }
        // console.log(info)
        return resolve('send successful')
      })
    } catch (error) {
      return reject({
        statusCode: 500,
        error,
      })
    }
  })

module.exports = {
  sendMail,
}
