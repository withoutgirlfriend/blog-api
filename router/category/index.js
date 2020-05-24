const express = require('express');
const router = express.Router();

const {filterRole} = require('../../util/token');
const addCategory = require('./addCategory');

//添加分类
router.post('/addCategory', filterRole('root', addCategory));


module.exports = router;
