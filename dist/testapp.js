"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes.js"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _userRoutes = require("./routes/userRoutes");
var _commentRoutes = _interopRequireDefault(require("./routes/commentRoutes"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _documentation = _interopRequireDefault(require("./documentation/documentation.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//connecting to Mbd and lsiten to port through that
_dotenv.default.config();
const testServer = (0, _express.default)();
testServer.use('/documentation', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_documentation.default));

//middleware
testServer.use(_express.default.json());
testServer.use((0, _cors.default)());
testServer.use(_messageRoutes.default);
testServer.use(_blogRoutes.default);
testServer.use(_userRoutes.userRoutes);
testServer.use(_commentRoutes.default);
testServer.use((_req, res) => {
  res.status(404).json({
    error: 'endpoint doesnt exist'
  });
});
const hosted = process.env.DB_LINK;
_mongoose.default.set('strictQuery', true);
_mongoose.default.connect(hosted, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  testServer.listen(1050, () => {});
}).catch(err => {
  console.log(err.message);
});
var _default = testServer;
exports.default = _default;