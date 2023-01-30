import request from 'supertest';
import server from '../app';
jest.setTimeout(30000);
describe('tests for users', () => {
  test('login testing', async() => {
  await request(server)
     .post('/login')
     .send({
       email: 'dontwork@email.com',
       password: 'idkyoutellme',
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
