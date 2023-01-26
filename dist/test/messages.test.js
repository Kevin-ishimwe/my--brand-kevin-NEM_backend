"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _testapp = _interopRequireDefault(require("../testapp"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('messages tests', () => {
  test('getting messages no privileged', () => {
    (0, _supertest.default)(_testapp.default).get('/getmessages').set({
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU'
    }).expect(function (res) {
      expect(res.status).toBe(200);
    });
  });
  test('deleting messages', () => {
    (0, _supertest.default)(_testapp.default).delete('/deletemessage/63bdbf7fe4c0a201f8f8e0ec').expect(function (res) {
      expect(res.status).toBe(200);
    });
  });
  test('adding message', () => {
    (0, _supertest.default)(_testapp.default).post('/addmessages').send({
      name: "ish boy",
      email: "jesterboy@gmail.co ",
      content: " of jester"
    }).expect(function (res) {
      expect(res.status).toBe(201);
    });
  });
});