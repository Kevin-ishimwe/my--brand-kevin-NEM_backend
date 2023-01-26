"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoutes = require("./userRoutes");
var _messagesControllers = require("../controllers/messagesControllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageRoutes = _express.default.Router();
//get messages
MessageRoutes.get('/getmessages', _userRoutes.authenticateToken, _messagesControllers.getMessages);
//add messages
MessageRoutes.post('/addmessages', _messagesControllers.addMessages);
MessageRoutes.delete('/deletemessage/:id', _messagesControllers.deleteMessage);
//there wont be any need for an update route since messages dont need updates
var _default = MessageRoutes;
exports.default = _default;