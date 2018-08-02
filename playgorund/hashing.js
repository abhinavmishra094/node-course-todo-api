const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$8Xex8X7ImhZBKA/xj9PJheUQooaebW8Zwk.PdBkXcTvKOYBKYe3NK';
bcrypt.compare(password,hashedPassword,(err,res)=>{
  console.log(res);
});
// var data = {
//   id:10
// }
// var token = jwt.sign(data,'123abc');
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id:4
// };
// var token = {
//   data,
//   hash:SHA256(JSON.stringify(data)+'somedecret').toString()
// }
//
// token.data.id = 5;
// token.hash - SHA256(JSON.stringify(data)+'somedecret').toString();
// var resultHash = SHA256(JSON.stringify(token.data)+'somedecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// }else {
//   console.log('Data was changed. Do not trust');
// }
