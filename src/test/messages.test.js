import request from 'supertest';
import app from '../app'
describe('messages tests', () => {

  test('getting messages no privileged', () => {
    request(app)
      .get('/getmessages')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  })

  test('deleting messages', () => {
  request(app)
      .delete('/deletemessage/63bdbf7fe4c0a201f8f8e0ec')
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('adding message',()=>{
     request(app)
      .post('/addmessages')
      .send({
        name: "ish boy",
        email: "jesterboy@gmail.co ",
        content: " of jester",
      })
      .expect(function (res) {
        expect(res.status).toBe(201);
      });
  })
});
