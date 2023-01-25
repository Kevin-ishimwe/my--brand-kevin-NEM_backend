import request from 'supertest';
import app from '../app';

describe('tests for comments section', () => {
  test('getting comments ', () => {
     request(app)
      .get('/getcomments')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('deleting messages', () => {
     request(app)
      .delete('/deletecomment/63ca24fc7cfa30c82f6f0565')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('adding comment', () => {
     request(app)
      .post('/addcomment/63c791b675426914a79d53e9')
      .send({
        name: 'comment with jest ',
        comment: 'supa test super awesome',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
});
