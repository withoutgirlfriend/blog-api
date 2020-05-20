const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagName: {//标签名称
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10
  },
  state: {//标签状态 0：正常 1：已删除
    type: Number,
    enum: [0, 1],
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

const tagModel = mongoose.model('tags', tagSchema);

module.exports = tagModel
