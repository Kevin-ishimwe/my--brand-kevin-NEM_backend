import request from 'supertest';
import server from '../app';
jest.setTimeout(10000);
describe('tests for users', () => {
  test('login testing', () => {
    request(server)
      .post('/login')
      .send({
        email: 'dontwork@email.com',
        password: 'idkyoutellme',
      })
      .expect(function (res) {
        expect(res.status).toBe(404);
      });
  });
});
