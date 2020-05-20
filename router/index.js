const tag = require('./tag');
const article = require('./article');
const user = require('./user');
const comment = require('./comment');
const category = require('./setting');
const setting = require('./setting');

module.exports = app => {
  // app.use('/tag',tag)
  // app.use('/article',article)
  app.use('/user',user)
  // app.use('/comment',comment)
  // app.use('/category',category)
  // app.use('/setting',setting)
}
