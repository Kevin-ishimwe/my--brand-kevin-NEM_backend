import request from 'supertest';
import server from '../server';
jest.setTimeout(10000);

describe('blog tests', () => {
  test('getting blogs no privileged', async () => {
    await request(server)
      .get('/getblogs')
      .expect(function (res) {
        return expect(res.status).toBe(200);
      });
  });
  test('getting single blogs', async () => {
    await request(server)
      .get('/singleblog/63d3eef48b021d174d8b69d0')
      .expect(function (res) {
        return expect(res.status).toBe(200);
      });
  });

  test('delete a blog', async () => {
    await request(server)
      .delete('/deleteblog/djdjndndnd')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .expect(function (res) {
        return expect(res.status).toBe(403);
      });
  });

  test('adding a malformed blog', async () => {
    request(server)
      .post('/addblog')
      .set({
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
      })
      .send({
        blogTitle: 'blogTitle',
        blogDescription: 'blogDescription',
        blogContent: 'blogContent',
        blogImgId: 'result.public_id',
      })
      .expect((res) => {
        return expect(res.status).toBe(403);
      });
  });
});
