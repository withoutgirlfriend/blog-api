const {isObjectId, tagNameVerify} = require('../../util/typeVerify');
const tagModel = require('../../dbmodel/tags');

module.exports = async (req, res, tokenObj) => {
  try {
    //获取标签id和新标签名
    const {newTagName} = req.body;
    const {tagId} = req.params;
    
    //标签id验证
    if (!isObjectId(tagId))
      return res.json({data: [], meta: {state: 400, msg: '标签id不合法！'}});
    
    //新标签名验证
    if (!tagNameVerify(newTagName))
      return res.json({data: [], meta: {state: 400, msg: '标签名长度不符合规范！'}});
    
    //验证标签是否已经存在
    const exist = await tagModel.findOne({tagName: newTagName});
    if (exist)
      return res.json({data: [], meta: {state: 400, msg: '标签名已存在！'}});
    
    //保存修改数据，返回新数据
    const newTagInfo = await tagModel.findByIdAndUpdate(tagId, {tagName: newTagName}, {new: true});
    res.json({data: newTagInfo, meta: {state: 200, msg: '标签名修改成功！'}});
  } catch (e) {
    res.json({data: [], meta: 500, msg: '服务器错误,前端请返回网络繁忙！'});
  }
}
