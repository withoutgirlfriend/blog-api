const userModel = require('../../dbmodel/users');
const {isObjectId} = require('../../util/typeVerify');

module.exports = async (req, res, tokenObj) => {
  //获取要修改的用户的id
  const {userId} = req.params;
  
  //获取要修改的新权限
  const {newRole} = req.body;
  
  //id合法性验证
  if (!isObjectId(userId))
    return res.json({data: [], meta: {state: 400, msg: '用户id不合法'}});
  
  //权限合法性验证
  if (newRole === 'root')
    return res.json({data: [], meta: {state: 400, msg: '不能修改为root权限！'}});
  if (newRole !== 'admin' && newRole !== 'normal')
    return res.json({data: [], meta: {state: 400, msg: '权限参数不合法！'}});
  
  try {
    const newUserInfo = await userModel.findByIdAndUpdate(userId, {role: newRole}, {new: true});
    res.json({data: newUserInfo, meta: {state: 200, msg: '权限修改成功！'}});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务器错误，前端请显示服务繁忙！'}});
  }
}
