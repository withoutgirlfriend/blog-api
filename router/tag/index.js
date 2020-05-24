const express = require('express');
const router = express.Router();
const {filterRole} = require('../../util/token');

const addTag = require('./addTags');
const getAllTags = require('./getAlltags');
const updateTagNameById = require('./updateTagNameById');
const deleteTagById = require('./deleteTagById');
//添加标签
router.post('/addTag', filterRole('root', addTag));

//根据标签id修改标签名
router.put('/updateTagNameById/:tagId', filterRole('root', updateTagNameById));

//获取所有标签
router.get('/getAllTags', getAllTags);

//根据id删除标签
router.delete('/deleteTagById/:tagId', filterRole('root', deleteTagById));
module.exports = router;
