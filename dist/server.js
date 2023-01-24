"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _messageRoutes = _interopRequireDefault(require("./routes/messageRoutes.js"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _userRoutes = require("./routes/userRoutes");
var _commentRoutes = _interopRequireDefault(require("./routes/commentRoutes"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _documentation = _interopRequireDefault(require("../helper/documentation.js"));
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
app.use((req, res) => {
  res.json({
    error: 'endpoint doesnt exist'
  }).status(404);
});

//connecting to Mbd and lsiten to port through that
_dotenv.default.config();
const hosted = process.env.DB_LINK;
_mongoose.default.set('strictQuery', true);
_mongoose.default.connect(hosted, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(1010, () => {
    console.log('server running');
  });
  console.log('connected to dbs');
}).catch(err => {
  console.log(err);
});