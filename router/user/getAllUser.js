const userModel = require('../../dbmodel/users');

module.exports = async (req, res, tokenObj) => {
  // res.send('获取所有用户！');
  try {
    const allUser = await userModel.find({}, {password: 0, __v: 0});
    res.json({data: allUser, meta: {state: 200, msg: '获取所有用户成功！'}, token: tokenObj.token});
  } catch (e) {
    res.json({data: [], meta: {state: 500, msg: '服务端出错，前端请显示服务繁忙！'}})
  }
}
