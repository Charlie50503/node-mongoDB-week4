var express = require('express');
var router = express.Router();
const users = require('../controllers/user')
/* GET users listing. */
router.get('/', users.get);

module.exports = router;
