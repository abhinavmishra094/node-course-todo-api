const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach ((done)=>{
  Todo.remove({}).then(()=>done());
});
describe('Post /todo',()=>{
  it('should create a new todo',(done)=>{
    var text = 'Test todo text';

    request(app)
    .post('/todo')
    .send({text})
    .expect(200)
    .exec((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
      }).catch((e)=>done(e))
    });

  });
})
