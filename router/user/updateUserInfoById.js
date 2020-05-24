const userModel = require('../../dbmodel/users');
const sha1 = require('sha1');
const {isObjectId, emailVerify, usernameVerify, genderVerify} = require('../../util/typeVerify');
const token = require('../../util/token');

module.exports = async (req, res) => {
  try {
  //获取登录用户的token
  const tokenStr = req.headers.token;
  
  //验证登录状态
  if (!tokenStr)
    return res.json({data: [], meta: {state: 403, msg: '您还未登录，请先登录！'}});
  
  //token状态验证
  const tokenObj = await token.verify(tokenStr);
  if (!tokenObj)
    return res.json({data: [], meta: {state: 403, msg: '您的登录信息已过期，请重新登录！'}});
  
  //获取要修改的用户id参数
  const {userId} = req.params;
  
  //id合法性验证
  if (!isObjectId(userId))
    return res.json({data: [], meta: {state: 400, msg: 'id不合法！'}});
  
  //验证用户是否存在
  const exist = userModel.findById(userId);
  if (!exist)
    return res.json({data: [], meta: {state: 404, msg: '用户不存在！'}});
  
  //用户权限判定
  // console.log(tokenObj.userInfo.role);
  // console.log(userId.toString() !== tokenObj.userInfo._id.toString())
  if (tokenObj.userInfo.role !== 'root' && userId.toString() !== tokenObj.userInfo._id.toString())
    return res.json({data: [], meta: {state: 403, msg: '用户信息只能被自己或者超级管理员修改，您没有权限！'}});
  
  //获取传入的新用户信息
  const {username, avatar, email, gender} = req.body;
  
  //参数判断
  if (!username || !avatar || !email || !gender)
    return res.json({data: [], meta: {state: 400, msg: '信息参数不能为空！'}});
  
  if (!usernameVerify(username))
    return res.json({data: [], meta: {state: 400, msg: '用户名长度只能在2-20字符之间！'}});
  
  if (!emailVerify(email))
    return res.json({data: [], meta: {state: 400, msg: '邮箱不合法！'}});
  
  if (!genderVerify(gender))
    return res.json({data: [], meta: {state: 400, msg: '性别只能是男女或保密！'}});
  
  //将新信息保存数据库
  
    const newUserInfo = await userModel.findByIdAndUpdate(userId, {username, gender, avatar, email}, {new: true});
    if (!newUserInfo)
      return res.json({data: [], meta: {state: 500, msg: '更改失败，请检查接口！'}});
    const returnUserInfo = await userModel.findById(userId, {password: 0, __v: 0});
    res.json({data: returnUserInfo, meta: {state: 200, msg: '信息修改成功！'}});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务器内部错误，前端请显示服务繁忙！'}});
  }
}
