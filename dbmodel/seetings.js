const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const settingSchema = new Schema({
  logo: {//网站logo
    type: String,
    require: true
  },
  siteName: {//网站名称
    type: String,
    default: '我的站点'
  },
  record: {
    fontColor: {
      type: String,
      default: '#ffffff'
    },
    icp: {
      type: String,
      default: ''
    },
    police: {
      type: String,
      default: ''
    },
    copyright: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

const settingModel = mongoose.model('settings', settingSchema);
module.exports = settingModel
