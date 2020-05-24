const tagModel = require('../../dbmodel/tags');

module.exports = async (req, res, tokenObj) => {
  try {
  const allTags = await tagModel.find({},{__v: 0});
    res.json({data: allTags, meta: {state: 200, msg: '获取所有标签成功！'}});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务器错误，前端请显示服务繁忙！'}});
  }
}
