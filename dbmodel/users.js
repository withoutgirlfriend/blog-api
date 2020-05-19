const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    default: null,
    minlength: 2,
    maxlength: 20,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 16,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    default: '保密',
    enum: ['男', '女', '保密']
  }
}, {
  //自动获取创建与更新时间
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
});

const userModel = mongoose.model('users', userSchema);

// userModel.create({
//   password: '18982897450a',
//   email: 'leesunbeam@qq.com',
//   gender: '男'
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })
module.exports = userModel
