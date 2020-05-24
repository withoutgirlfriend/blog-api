const token = require('../../util/token');
const userModel = require('../../dbmodel/users');
const sha1 = require('sha1');
const filter = {password: 0, __v: 0};//查询用户时过滤掉的信息

module.exports = async (req, res) => {
  //获取用户名密码和token有效时间
  let {username, password} = req.body;
  
  //查询数据库用户
  const userInfo = await userModel.findOne({username, password: sha1(password)}, filter);
  
  //如果查询不到返回登录失败
  if(!userInfo)
    return res.json({data: [], meta: {state: 403, msg: '登录失败，用户名或密码错误'}});
  
  //生成token
  const tokenStr = token.sign(username, password, userInfo.role);
  // const result = await token.verify(tokenStr)
  // console.log(result);
  //返回登录成功信息并下发token
  res.json({data: userInfo, meta: {state: 200, msg: '登录成功'}, token: tokenStr});
}
