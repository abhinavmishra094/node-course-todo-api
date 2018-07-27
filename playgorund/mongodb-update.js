// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

db.collection('Todos').findOneAndUpdate({
  _id:new ObjectId('5b5976a88e90c409bcc7c779')
},{
  $set:{
    name :'Abhinav'
  },
  $inc:{
    age:1
  }
},{
  returnOriginal:false
}).then((result)=>{
  console.log(result
  );
})
//   // db.close();
});
