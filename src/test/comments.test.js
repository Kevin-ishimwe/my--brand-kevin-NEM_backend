import request from 'supertest';
import server from '../server';
jest.setTimeout(30000);

describe('tests for comments section', () => {
  test('getting comments ', async () => {
    await request(server)
      .get('/getcomments')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        return expect(res.status).toBe(200);
         
      }).catch(error => {
      console.error(error);
      throw error;
    });
  });
  test('deleting messages', async () => {
    await request(server)
      .delete('/deletecomment/63ca24fc7cfa30c82f6f0565')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        return expect(res.status).toBe(200);
         
      }).catch(error => {
      console.error(error);
      throw error;
    });
  });
  test('adding comment', async () => {
    await request(server)
      .post('/addcomment/63c791b675426914a79d53e9')
      .send({
        name: 'comment with jest ',
        comment: 'supa test super awesome',
      })
      .expect(function (res) {
        return expect(res.status).toBe(200);
         
      }).catch(error => {
      console.error(error);
      throw error;
    });
  });
});
