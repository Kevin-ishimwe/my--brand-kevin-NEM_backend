"use strict";

var _app = _interopRequireDefault(require("./app"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//connecting to Mbd and lsiten to port through that
_dotenv.default.config();
const hosted = process.env.DB_LINK;
console.log(hosted);
_mongoose.default.set('strictQuery', true);
_mongoose.default.connect(hosted, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  _app.default.listen(8000, () => {
    console.log('server running');
  });
  console.log('connected to dbs');
}).catch(err => {
  console.log(err.message);
});
