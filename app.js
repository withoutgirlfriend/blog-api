const express = require('express');
const app = express();
const cors = require('cors');
//连接数据库
require('./connectdb')
const router = require('./router')

//解决跨域
app.use(cors());

//解析post请求参数，可使用req.body获取
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//token验证
// const token = require('./util/token');
// app.use(token.verify())

//挂载路由
router(app);

//错误处理中间件
app.use('*', (req, res, next) => {//404处理
  res.json({data: [], meta: {stat: 404, msg: '接口不存在呀！请检查请求方式和url'}});
})

//端口监听
app.listen(520, err=>{
  if(err)
    return console.log(err);
  console.log('server running at http://localhost:520');
})
