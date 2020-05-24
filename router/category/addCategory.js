const {categoryNameVerify} = require('../../util/typeVerify');
const categoryModel = require('../../dbmodel/categories');

module.exports = async (req, res, tokenObj) => {
  //获取分类名称
  const {categoryName} = req.body;
  
  //判断是否为空
  if (!categoryName)
    return res.json({data: [], meta: {state: 400, msg: '分类名称不能为空！'}});
  
  //判断长度是否合法
  if (!categoryNameVerify(categoryName))
    return res.json({data: [], meta: {state: 400, msg: '分类名称长度不合法！'}});
  
  try {
   const exist = await categoryModel.findOne({categoryName});
    if (exist)
      return res.json({data: [], meta: {state: 400, msg: '分类名称已存在！'}});
    
    const categoryInfo = await categoryModel.create({categoryName});
    res.json({data: categoryInfo, meta: {state: 200, msg: '分类添加成功！'}});
  } catch (e) {
   res.json({data: [], meta: {state: 500, msg: '服务器错误，前端请显示服务繁忙！'}});
  }
}
