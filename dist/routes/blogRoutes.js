"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoutes = require("./userRoutes");
var _multer = _interopRequireDefault(require("../utils/multer"));
var _blogControllers = require("../controllers/blogControllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BlogRoutes = _express.default.Router();
BlogRoutes.get('/getblogs', _blogControllers.getBlogs);
BlogRoutes.get('/singleblog/:id', _blogControllers.singleBlog);
BlogRoutes.post('/addblog', _userRoutes.authenticateToken, _multer.default.single('blogImg'), _blogControllers.addBlogs);
BlogRoutes.delete('/deleteblog/:id', _userRoutes.authenticateToken, _multer.default.single('blogImg'), _blogControllers.deleteBlogs);
BlogRoutes.put('/updateblog/:id', _userRoutes.authenticateToken, _multer.default.single('blogImg'), _blogControllers.updateBlog);
var _default = BlogRoutes;
exports.default = _default;