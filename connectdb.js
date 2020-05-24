const mongoose = require('mongoose');
const {USER_NAME, PASSWORD, HOST, PORT, DATABASE_NAME} = require('./config/index').DATABASE;
const uri = `mongodb://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE_NAME}`;
const connect_db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
connect_db.then(res => {
  // console.log(process.env)
  console.log('当前环境：', process.env.NODE_ENV);
  console.log(`mongodb://${HOST}:${PORT}/${DATABASE_NAME}数据库连接成功`)
}).catch(err => {
  console.log(err);
  console.log('连接失败')
})
// db.createUser({"username": "blog", "pwd": "blog", "roles": [{"role": "readWrite", "db": "blog"}]})
