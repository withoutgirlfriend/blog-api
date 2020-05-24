module.exports.isObjectId = id => {
  //objectId的合法性验证
  if(typeof id === 'string' || typeof id === 'object') {
    const idRegExp = /^[0-9a-z]{24}$/;
    return idRegExp.test(id);
  } else {
    return false;
  }
  
}
//username验证
module.exports.usernameVerify = username => username.trim().length <= 20 || username.trim().length >= 2;
//密码验证
module.exports.passwordVerify = password => {
  const passwordRegExp = /^[0-9a-zA-Z]{6,16}$/;
  return passwordRegExp.test(password);
}
//email验证
module.exports.emailVerify = email => {
  const emailRegExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return emailRegExp.test(email);
}
//性别验证
module.exports.genderVerify = gender => gender === '男' || gender === '女' || gender === '保密';

//标签名验证
module.exports.tagNameVerify = tagName => tagName.trim().length <= 20 && tagName.trim().length >= 2;

//分类名称验证
module.exports.categoryNameVerify = categoryName => categoryName.trim().length <= 20 && categoryName.trim().length >= 2;
