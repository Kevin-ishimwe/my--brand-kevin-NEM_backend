import request from 'supertest';
import app from '../app'

describe('blog tests', () => {

  test('getting blogs no privileged', async () => {
     request(app)
      .get('/getblogs')
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('getting single blogs', async () => {
     request(app)
      .get('/singleblog/63c92298ad493378dc71153f')
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
  test('delete a blog', async () => {
     request(app)
      .delete('/deleteblog/:id')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        expect(res.status).toBe(200);
      });
  });
});
