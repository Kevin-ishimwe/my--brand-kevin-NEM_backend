"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRoutes = _express.default.Router();
userRoutes.post('/adduser', _userController.addUser);
userRoutes.put('/updateuser/:email', _userController.authenticateToken, _userController.updateUser);
userRoutes.get('/getusers', _userController.authenticateToken, _userController.getUsers);
userRoutes.post('/login', _userController.login);
userRoutes.delete('/deleteuser/:email', _userController.authenticateToken, _userController.deleteUser);
module.exports = {
  userRoutes: userRoutes,
  authenticateToken: _userController.authenticateToken
};