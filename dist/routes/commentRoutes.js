"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoutes = require("./userRoutes");
var _commentControllers = require("../controllers/commentControllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commentRoutes = _express.default.Router();
commentRoutes.post('/addcomment/:id', _commentControllers.addComment);
commentRoutes.get('/getcomments', _userRoutes.authenticateToken, _commentControllers.getComments);
commentRoutes.delete('/deletecomment/:id', _userRoutes.authenticateToken, _commentControllers.deleteComments);
var _default = commentRoutes;
exports.default = _default;