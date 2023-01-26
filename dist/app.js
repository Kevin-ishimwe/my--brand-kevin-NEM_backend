"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes.js"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _userRoutes = require("./routes/userRoutes");
var _commentRoutes = _interopRequireDefault(require("./routes/commentRoutes"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _documentation = _interopRequireDefault(require("./documentation/documentation.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use('/documentation', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_documentation.default));

//middleware
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_messageRoutes.default);
app.use(_blogRoutes.default);
app.use(_userRoutes.userRoutes);
app.use(_commentRoutes.default);
app.use((_req, res) => {
  res.status(404).json({
    error: 'endpoint doesnt exist'
  });
});
var _default = app;
exports.default = _default;