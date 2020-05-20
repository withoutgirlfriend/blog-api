const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  categoryName: {//分类名称
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10
  },
  state: {//分类状态 0正常 1已删除
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

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel
