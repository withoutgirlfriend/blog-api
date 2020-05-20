const express = require('express');
const router = express.Router();
const user = require('./user');
router.get('/addUser',user.addUser)

module.exports = router
