const {ObjectId} = require('mongodb');

const {mongoose} = require('./../sever/db/mongoose');
const {Todo} = require('./../sever/models/todo');
const {User} = require('./../sever/models/user')
// var id = '5b5e9495b92c96a012d1e333';
// if(!ObjectId.isValid(id)){
//   console.log('id not valid');
// }
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id:',todo);
// }).catch((e)=>console.log('Id not found'));
var id = '5b5ae47dfb15276037dc7db7';
User.findById(id).then((todo)=>{
  if(!todo){
    return console.log('Id not found');
  }
  console.log('User By Id:',JSON.stringify(todo,undefined,2));
}).catch((e)=>console.log('Id not found'));
