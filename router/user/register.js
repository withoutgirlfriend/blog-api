const userModel = require('../../dbmodel/users');
const sha1 = require('sha1');
const {usernameVerify, passwordVerify, emailVerify} = require('../../util/typeVerify');

module.exports = async (req, res) => {
  let {username, password, rePassword, email} = req.body;
  
  //用户名与密码判断
  if (!username || !password)
    return res.json({data: [], meta: {state: 400, msg: '用户名或密码不能为空！'}});
  else
    username = username.trim();
  
  //邮箱判断
  if(!email)
    return res.states(404).json({data: [], meta: {state: 400, msg: '邮箱不能为空！'}})
  
  //用户名判断
  if (!usernameVerify(username))
    return res.json({data: [], meta: {state: 400, msg: '用户名长度只能在2-20个字符！'}});
  
  //判断用户是否已存在
  if (await userModel.findOne({username}))
    return res.json({data: [], meta: {state: 400, msg: '用户名已存在！'}});
  
  //两次密码一致性验证
  if (!(password === rePassword))
    return res.json({data: [], meta: {state: 400, msg: '两次输入的密码不一致！'}});
  
  //密码合法性验证
  if (!passwordVerify(password))
    return res.json({data: [], meta: {state: 400, msg: '密码只能由6-16位数字或字母组成！'}});
  
  //邮箱验证
  if (!emailVerify(email))
    return res.json({data: [], meta: {state: 400, msg: '邮箱不合法！'}});
  
  //将用户密码加密并保存到数据库
  try {
    const userInfo = await userModel.create({username, password: sha1(password), email});
    //注册成功返回用户信息（不含密码）
    const user = await userModel.findOne({username: userInfo.username, password: userInfo.password}, {password: 0, __v: 0});
    res.json({
      data: user,
      meta: {
        state: 200,
        msg: '用户注册成功！'
      }
    });
  } catch (e) {
    return res.json({data: [], meta: {state: 500, msg: '注册出错，请检查接口！'}});
  }
}
