const {isObjectId} = require('../../util/typeVerify');
const tagModel = require('../../dbmodel/tags');
module.exports = async (req, res) => {
  //获取要删除的标签id
  const {tagId} = req.params;
  
  //id验证
  if (!isObjectId(tagId))
    return res.json({data: [], meta: {state: 400, msg: '标签id不合法'}});
  
  try {
    const exist = await tagModel.findById(tagId);
    if (!exist)
      return res.json({data: [], meta: {state: 404, msg: '要删除的标签不存在！'}})
    
    const deleteRes = await tagModel.findByIdAndDelete(tagId);
    res.json({data: deleteRes, meta: {state: 200, msg: '标签删除成功！'}});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务器错误，前端请显示服务繁忙！'}});
  }
}
