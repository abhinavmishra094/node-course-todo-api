const {ObjectId} = require('mongodb');

const {mongoose} = require('./../sever/db/mongoose');
const {Todo} = require('./../sever/models/todo');
const {User} = require('./../sever/models/user')


// Todo.remove({}).then((result)=>{
//   console.log(result);
// });
Todo.findOneAndRemove({_id:'5b5edb3e04240301d8fb1892'}).then((todo)=>{
    console.log(todo);
});
Todo.findByIdAndRemove('5b5edb3e04240301d8fb1892').then((todo)=>{
    console.log(todo);
});
