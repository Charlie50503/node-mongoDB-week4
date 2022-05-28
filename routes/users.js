var express = require('express');
var router = express.Router();
const users = require('../controllers/user')
const {isAuth} = require('../middleware/auth');
const { handleErrorAsync } = require('../utils/errorHandle')
/* GET users listing. */
router.get('/',isAuth,handleErrorAsync(users.get));
router.get('/profile',isAuth, handleErrorAsync(users.getProfile));
router.patch('/profile',isAuth,  handleErrorAsync(users.patchProfile));
router.post('/sign_up', handleErrorAsync(users.postSignUp));
router.post('/sign_in', handleErrorAsync(users.postSignIn));
router.post('/updatePassword',isAuth, handleErrorAsync(users.postUpdatePassword));

module.exports = router;
