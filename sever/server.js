const express = require('express');
const bodyParser = require('body-parser');

var {mongoose } = require('./db/mongoose');
var {Todo } = require('./models/todo');
var {User } = require('./models/user');

var app = express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((docs)=>{
    res.send(docs);
  },(e)=>{
    res.status(400).send(e);
  });
})

app.get('/todos',(req,res)=>{
  Todo.find().then((todo)=>{
    res.send({todo});
  },(e)=>{
      res.status(400).send(e);
  });
});
app.listen(3000,()=>{
  console.log('started on posrt 3000');
});

module.exports = {app};
