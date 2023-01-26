"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _testapp = _interopRequireDefault(require("../testapp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('tests for comments section', () => {
  test('getting comments ', async () => {
    await (0, _supertest.default)(_testapp.default).get('/getcomments').set({
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU'
    }).expect(function (res) {
      expect(res.status).toBe(200);
    });
  });
  test('deleting messages', async () => {
    await (0, _supertest.default)(_testapp.default).delete('/deletecomment/63ca24fc7cfa30c82f6f0565').set({
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU'
    }).expect(function (res) {
      expect(res.status).toBe(200);
    });
  });
  test('adding comment', async () => {
    await (0, _supertest.default)(_testapp.default).post('/addcomment/63c791b675426914a79d53e9').send({
      name: 'comment with jest ',
      comment: 'supa test super awesome'
    }).expect(function (res) {
      expect(res.status).toBe(200);
    });
  });
});