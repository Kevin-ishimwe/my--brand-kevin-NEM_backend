import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
jest.setTimeout(30000);
let server;
const hosted = process.env.DB_LINK;
beforeAll(async () => {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      try {
        server = app.listen(8000, () => {
          console.log('server running');
          console.log('connected to dbs');
        });
      } catch (error) {
        console.log(error);
      }
    });
});
afterAll(async () => {
  await server.close();
});

describe('blog tests', () => {
  test('getting blogs no privileged', async () => {
    await request(server)
      .get('/getblogs')
      .expect(function (res) {
        return expect(res.status).toBe(200);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });
  test('getting single blogs', async () => {
    await request(server)
      .get('/singleblog/63d3eef48b021d174d8b69d0')
      .expect(function (res) {
        return expect(res.status).toBe(200);
      })
      .catch((error) => {
        console.error(error);
        throw error;
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
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });

  test('adding a malformed blog', async () => {
    await request(server)
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
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });



  //comments
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
        })
        .catch((error) => {
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
        })
        .catch((error) => {
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
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });
  });
  describe('messages tests', () => {
    test('getting messages no privileged', async () => {
      await request(server)
        .get('/getmessages')
        .set({
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
        })
        .expect(function (res) {
          return expect(res.status).toBe(200);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });

    test('deleting messages', async () => {
      await request(server)
        .delete('/deletemessage/63bdbf7fe4c0a201f8f8e0ec')
        .expect(function (res) {
          return expect(res.status).toBe(200);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });
    test('adding message', async () => {
      await request(server)
        .post('/addmessages')
        .send({
          name: 'ish boy',
          email: 'jesterboy@gmail.co ',
          content: ' of jester',
        })
        .expect(function (res) {
          return expect(res.status).toBe(201);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });
  });
});
