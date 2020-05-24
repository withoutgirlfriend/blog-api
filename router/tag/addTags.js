const tagModel = require('../../dbmodel/tags');
const {tagNameVerify} = require('../../util/typeVerify');
module.exports = async (req, res, tokenObj) => {
  try {
    const {tagName} = req.body;
    //标签名长度验证
    if (!tagNameVerify(tagName))
      return res.json({data: [], meta: {state: 400, msg: '标签名长度不符合规范！'}});
    
    //验证标签是否存在
    const exist = await tagModel.findOne({tagName});
    // console.log(exist)
    if (exist)
      return res.json({data: [], meta: {state: 400, msg: '标签已存在！'}});
    
    //保存标签
    const tagInfo = await tagModel.create({tagName});
    res.json({data: tagInfo, meta: {state: 200, msg: '标签添加成功！'}});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务器内部错误，前端请显示服务繁忙！'}})
  }
}
