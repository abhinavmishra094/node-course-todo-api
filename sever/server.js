require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose } = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')
var app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.post('/todos',authenticate,(req,res)=>{
  var todo = new Todo({
    text:req.body.text,
    _creator:req.user._id
  });
  todo.save().then((docs)=>{
    res.send(docs);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',authenticate,(req,res)=>{
  Todo.find({
    _creator:req.user._id
  }).then((todo)=>{
    res.send({todo});
  },(e)=>{
      res.sendStatus(400).send(e);
  });
});
app.get('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.sendStatus(404).send({});
  }
  Todo.findById({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.sendStatus(400).send({});
    }
    res.send(todo);
  }).catch((e)=> res.sendStatus(400).send({}));

});

app.delete('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    res.sendStatus(404).send({});
  }
  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.sendStatus(404).send({});
    }
    res.send({todo});
  }).catch((e)=> res.sendStatus(404).send({}));
});

app.patch('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if(!ObjectId.isValid(id)){
    res.sendStatus(404).send({});
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByOneAndUpdate({
    _id:id,
    _creator:req.user._id
  },{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      res.sendStatus(404).send();
    }

    res.send({todo});
  }).catch((e)=>{
    res.sendStatus(400).send();
  })
});
app.post('/users',(req,res)=>{
  var body = _.pick(req.body, ['email','password']);

  var user = new User(body);
  console.log(user.password.toString());
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.sendStatus(400).send(e);
  });
});
app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user)=>{
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
      });
  }).catch((e)=>{
    res.sendStatus(400).send();
  });
});
app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.sendStatus(200).send();
  },()=>{
    res.sendStatus(400).send();
  });
});
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});
app.listen(port,()=>{
  console.log(`started on port ${port}`);
});

module.exports = {app};
