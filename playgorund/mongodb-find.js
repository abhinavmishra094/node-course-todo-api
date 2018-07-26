// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('User').find({name:'Jen'}).toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err) =>{
    console.log('unable to fetch todos',err);
  })
// db.collection('Todos').find({_id:new ObjectId('5b5976a88e90c409bcc7c778')}).toArray().then((docs)=>{
//   console.log('Todos');
//   console.log(JSON.stringify(docs,undefined,2));
// },(err) =>{
//   console.log('unable to fetch todos',err);
// })
//   db.collection('Todos').find().count().then((count)=>{
//     console.log(`Todos count: ${count}`);
//
//   },(err) =>{
//     console.log('unable to fetch todos',err);
//   })
//   // db.close();
});
