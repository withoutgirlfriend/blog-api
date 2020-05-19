const express = require('express');
const app = express();
require('./connectdb')
require('./dbmodel/users')
app.use('/', (req, res) => {
  res.set('content-type','text/json')
  // res.send('<h1>后台已搭建好！</h1>')
  res.send({name: 'good'})
})



app.listen(520, err=>{
  if(err)
    return console.log(err);
  console.log('server running at http://localhost:520')
})
