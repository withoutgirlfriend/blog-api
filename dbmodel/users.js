const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sha1 = require('sha1');
const userSchema = new Schema({
  username: {//用户名
    type: String,
    required: true,
    default: null,
    minlength: 2,
    maxlength: 20,
    trim: true
  },
  password: {//密码
    type: String,
    required: true,
    trim: true
  },
  avatar: {//头像
    type: String,
    default: null
  },
  email: {//邮箱
    type: String,
    trim: true,
    default: null
  },
  gender: {//性别
    type: String,
    default: '保密',
    enum: ['男', '女', '保密'],
    required: true
  },
  role: {//用户角色
    type: String,
    enum: ['root', 'admin', 'normal'],
    default: 'normal',
    required: true
  },
  state: {//用户状态
    type: Number,
    enum: [0, 1],//0代表正常 1代表删除
    default: 0
  }
}, {
  //自动获取创建与更新时间
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
});

const userModel = mongoose.model('users', userSchema);

userModel.find().then(res => {
  if(res.length === 0) {
    userModel.create({
      username: 'root',
      password: sha1('123456'),
      role: 'root'
    }).then(() => {
      console.log('超级管理员用户已创建！')
    })
  }else {
    console.log('有用户！')
  }
})
module.exports = userModel
