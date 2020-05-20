const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const articleSchema = new Schema({
  title: {//文章标题
    type: String,
    minLength: 5,
    maxLength: 100,
    required: [true, '请添加文章标题']
  },
  author: {//文章作者
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articleContent'
  },
  categories: {//文章所属分类
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: [true, '请先添加分类']
  },
  tags: [//文章所属标签
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tags',
      default: null,
    }
  ],
  state: {//文章状态，0代表正常，1代表已删除
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true
  },
  meta: {
    pv: {//文章浏览量
      type: Number,
      default: 0,
      min: 0
    },
    good: {//点赞数
      type: Number,
      default: 0,
      mix: 0
    },
    comments: {//评论数量
      type: Number,
      default: 0,
      min: 0
    }
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

const articleModel = mongoose.model('articles', articleSchema);
module.exports = articleModel
