const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  article: {//评论的文章
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articles',
    require: true
  },
  author: {//评论人
    type: String,
    minLength: 2,
    maxLength: 10,
    required: true,
    trim: true
  },
  content: {//评论内容
    type: String,
    required: true,
    trim: true
  },
  pid: {//评论的父评论id
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  state: {//评论状态 0正常 1删除
    type: Number,
    default: 0,
    enum: [0, 1]
  }
}, {
  timestamps: {
    createdAt: 'createTime',
  }
});

const commentModel = mongoose.model('comments', commentSchema);
module.exports = commentModel
