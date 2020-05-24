const JWT = require('jsonwebtoken');
const secret = 'blog';//定义秘钥
const userModel = require('../dbmodel/users');
const sha1 = require('sha1');

const token = {};

class TokenObj {
  constructor(token, userInfo) {
    this.token = token;
    this.userInfo = userInfo;
  }
}

//下发token
token.sign = (username, password, role) => {
  const createTime = Math.floor(Date.now() / 1000);//token创建时间
  const tokenValidTime = createTime + 60 * 60 * 3;//token有效时间3小时
  return JWT.sign({
    username,
    password,
    role,
    exp: tokenValidTime
  }, secret);
}


token.verify = async tokenStr => {
  try {
    if (tokenStr) {
      //验证token token过期会抛出错误
      const {username, password} = JWT.verify(tokenStr, secret);
      
      //验证密码是否有效
      if (!username || !password) {
        throw new Error('用户名或密码无效！');
      } else {
        const userInfo = await userModel.findOne({username, password: sha1(password)});
        //用户名密码正确
        if (userInfo) {
          //更新token
          const tokenStr = token.sign(username, password);
          return new TokenObj(tokenStr, userInfo);
        } else {
          throw new Error('用户名或密码错误！');
        }
      }
    } else {
      throw new Error('无token！');
    }
  } catch (e) {
    return null
  }
}
//角色筛选
token.filterRole = (role, callback) => {
  if (!role) {
    throw new Error('请传入要筛选的权限！');
  }
  return async (req, res) => {
    //获取token
    const tokenStr = req.headers.token;
    
    //无token
    if (!tokenStr)
      return res.json({data: [], meta: {state: 403, msg: `该接口需提供${role}权限， 您还未登录！`}});
    try {
      //token验证
      const tokenObj = await token.verify(tokenStr);
      
      //信息过期
      if (!tokenObj)
        return res.json({data: [], meta: {state: 403, msg: `该接口需提供${role}权限，您的信息已过期！`}});
      
      //放行root超级权限
      if (tokenObj.userInfo.role === 'root')
        return callback(req, res, tokenObj);
      
      //权限不足
      if (!(role === tokenObj.userInfo.role))
        return res.json({data: [], meta: {state: 403, msg: `该接口需提供${role}权限，您无权访问！`}});
      callback(req, res, tokenObj);
    } catch (e) {
      throw new Error('权限筛选出错！')
    }
  }
}

module.exports = token;
