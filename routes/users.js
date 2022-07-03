var express = require('express');
var router = express.Router();
const users = require('../controllers/user')
const {isAuth} = require('../middleware/auth');
const {Validator} = require('../middleware/validator');
const { handleErrorAsync } = require('../utils/errorHandle')
/* GET users listing. */
router.get('/',isAuth,handleErrorAsync(users.get));
router.get('/profile',isAuth, handleErrorAsync(users.getProfile));
router.patch('/profile',isAuth,Validator.checkUpdateProfile,handleErrorAsync(users.patchProfile));
router.post('/sign_up', Validator.checkSignUp,handleErrorAsync(users.postSignUp));
router.post('/sign_in', Validator.checkSignIn,handleErrorAsync(users.postSignIn));
router.post('/updatePassword',isAuth,Validator.checkUpdatePassword, handleErrorAsync(users.postUpdatePassword));
router.post('/forgetPassword',isAuth,handleErrorAsync(users.forgetPassword));

module.exports = router;
