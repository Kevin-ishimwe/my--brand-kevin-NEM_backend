/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import path from 'path';

jest.setTimeout(30000);
let server;
const hosted = process.env.DB_TEST_LINK;
beforeAll(async () => {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      try {
        server = app.listen(8001, () => {
          console.log('test server running');
          console.log('connected to test dbs');
        });
      } catch (error) {
        console.log(error);
      }
    });
});
afterAll(async () => {
  await server.close();
});
//______________________ALL TESTS _____________________________________//
describe('all tests', () => {
  //doesnt exist
  test('getting endpoint that exist', async () => {
    await request(server)
      .get('/doestexist ')
      .expect(function (res) {
        return expect(res.status).toBe(404);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  });
  //blogtests
  describe('blog tests', () => {
    let blogID;

    describe('adding blog tests', () => {
      test('adding a real blog', async () => {
        jest.setTimeout(9000);
        await request(server)
          .post('/addblog')
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .attach('blogImg', path.join(__dirname, 'test.jpg'))
          .field('blogTitle', 'jest Title')
          .field('blogDescription', 'jest Description')
          .field('blogContent', 'jest Content')
          .expect((res) => {
            return expect(res.status).toBe(201);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('adding a a blog without token', async () => {
        await request(server)
          .post('/addblog')
          .send({
            blogTitle: 'blogTitle',
            blogDescription: 'blogDescription',
            blogContent: 'blogContent',
          })
          .expect((res) => {
            return expect(res.status).toBe(401);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('adding a blog with invalid token', async () => {
        await request(server)
          .post('/addblog')
          .set({
            token:
              'Bearer R5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .send({
            blogTitle: 'blogTitle',
            blogDescription: 'blogDescription',
            blogContent: 'blogContent',
            blogImgId: 'result.public_id',
          })
          .expect((res) => {
            return expect(res.status).toBe(400);
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
    });
    test('getting blogs no privileged', async () => {
      await request(server)
        .get('/getblogs')
        .expect(function (res) {
          blogID = res.body[1]._id;
          console.log(blogID);
          return expect(res.status).toBe(200);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });
    describe('single blog tests', () => {
      test('getting single blogs works', async () => {
        await request(server)
          .get(`/singleblog/${blogID}`)
          .expect(function (res) {
            return expect(res.status).toBe(200);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('getting single blogs doesnt exist', async () => {
        await request(server)
          .get('/singleblog/63d3678895665r5t4d8b69d0')
          .expect(function (res) {
            return expect(res.status).toBe(404);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
   
    });
    describe('update blog tests', () => {
      test('updating a malformed blog', async () => {
        await request(server)
          .put('/updateblog/12345drcfhdx3456g')
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
            return expect(res.status).toBe(400);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('updating blog with invalid token', async () => {
        await request(server)
          .put('/updateblog/12345drcfhdx3456g')
          .set({
            token:
              'Bearer rhthtuhtujj23cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .send({
            blogTitle: 'blogTitle',
            blogDescription: 'blogDescription',
            blogContent: 'blogContent',
            blogImgId: 'result.public_id',
          })
          .expect((res) => {
            return expect(res.status).toBe(400);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('updating blog works', async () => {
        await request(server)
          .put(`/updateblog/${blogID}`)
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .field('blogTitle', 'jest Title')
          .field('blogDescription', 'jest Description')
          .field('blogContent', 'jest Content')
          .attach('blogImg', path.join(__dirname, 'test.jpg'))
          .expect((res) => {
            return expect(res.status).toBe(204);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
    });
    describe('deleting blog', () => {
      test('delete a blog that exists', async () => {
        await request(server)
          .delete(`/deleteblog/${blogID}`)
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .expect(function (res) {
            return expect(res.status).toBe(204);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('delete a blog that exists without token', async () => {
        await request(server)
          .delete(`/deleteblog/${blogID}`)

          .expect(function (res) {
            return expect(res.status).toBe(401);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('delete a blog doesnt exist', async () => {
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
    describe('deleting comments test', () => {
      test('deleting comment', async () => {
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
      test('deleting comment', async () => {
        await request(server)
          .delete('/deletecomment/635')
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
          })
          .expect(function (res) {
            return expect(res.status).toBe(404);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
    });
    describe('adding comment test', () => {
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
      test('adding comment to a blog that doesnt exist', async () => {
        await request(server)
          .post('/addcomment/63c7914a79d53e9')
          .send({
            name: 'comment with jest ',
            comment: 'supa test super awesome',
          })
          .expect(function (res) {
            return expect(res.status).toBe(400);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
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
        .delete('/deletemessage/63d81f26ecc94feaf07d3d39')
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
      describe('adding message', () => {
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
        test('adding malformed message', async () => {
          await request(server)
            .post('/addmessages')
            .send({
              content: ' of jester',
            })
            .expect(function (res) {
              return expect(res.status).toBe(400);
            })
            .catch((error) => {
              console.error(error);
              throw error;
            });
        });
      });
      describe('deleting message test', () => {
        test('deleting messages', async () => {
          await request(server)
            .delete('/deletemessage/63d81f26ecc94feaf07d3d39')
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
            .delete('/deletemessage/63')
            .set({
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
            })
            .expect(function (res) {
              return expect(res.status).toBe(401);
            })
            .catch((error) => {
              console.error(error);
              throw error;
            });
        });
      });
    });
  });
  // users route test________________________________
  describe('testing users routes', () => {
    test('getting users priviledged', async () => {
      await request(server)
        .get('/getusers')
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

    describe('adding user tests', () => {
      test('adding a user route', async () => {
        await request(server)
          .post('/adduser')
          .send({
            email: 'jesttest@gmail.com',
            password: 'everything',
          })
          .expect(function (res) {
            return expect(res.status).toBe(201);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('adding a user who already exists', async () => {
        await request(server)
          .post('/adduser')
          .send({
            email: 'jesttest@gmail.com',
            password: 'everything',
          })
          .expect(function (res) {
            return expect(res.status).toBe(400);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
    });
    describe('logging in tests', () => {
      test('login testing pass', async () => {
        await request(server)
          .post('/login')
          .send({
            email: 'jesttest@gmail.com',
            password: 'everything',
          })
          .expect(function (res) {
            return expect(res.status).toBe(200);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('login testing user doesnt exist', async () => {
        await request(server)
          .post('/login')
          .send({
            email: 'dontwork@email.com',
            password: 'idkyoutellme',
          })
          .expect(function (res) {
            return expect(res.status).toBe(404);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('login testing user doesnt exist', async () => {
        await request(server)
          .post('/login')
          .send({
            email: 'jesttest@gmail.com',
            password: 'idkyoutellme',
          })
          .expect(function (res) {
            return expect(res.status).toBe(400);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
    });
    describe('updating user password', () => {
      test('updating  user password', async () => {
        await request(server)
          .put('/updateuser/jesttest@gmail.com')
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implc3R0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY3NTEwMjk1OH0.ZxNAEjicJokhkba7u_e6SGvE_g4jHdk9sV7uFyQsNAQ',
          })
          .send({
            password: 'password',
          })
          .expect(function (res) {
            return expect(res.status).toBe(200);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      });
      test('updating  user password with wrong email', async () => {
        await request(server)
          .put('/updateuser/jester@gmail.com')
          .set({
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaGltd2VrZXZpbjQ1QGdtYWlsLmNvbSIsImlhdCI6MTY3NTEwMTkwNX0.3MfhsfUelSYq2bdD7fXZ-oOQ8Zt3Tdo_JfQTGkHzg4w',
          })
          .send({
            password: 'password',
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

    test('deleting user', async () => {
      await request(server)
        .delete('/deleteuser/jesttest@gmail.com')
        .set({
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
        })
        .expect(function (res) {
          return expect(res.status).toBe(204);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });
  });
});
