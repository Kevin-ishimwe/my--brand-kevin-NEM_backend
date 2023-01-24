import request from 'supertest';

describe('messages tests', () => {

  test('getting messages no privileged', async () => {
    await request('http://localhost:1010')
      .get('/getmessages')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  })

  test('deleting messages', async () => {
    await request('http://localhost:1010')
      .delete('/deletemessage/63bdbf7fe4c0a201f8f8e0ec')
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('adding message',async ()=>{
     request('http://localhost:1010')
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
