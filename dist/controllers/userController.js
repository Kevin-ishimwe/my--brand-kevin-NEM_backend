"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;
exports.authenticateToken = authenticateToken;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;
exports.login = login;
exports.updateUser = updateUser;
var _userSchema = _interopRequireDefault(require("../models/userSchema"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
async function addUser(req, res) {
  const {
    email,
    password
  } = req.body;
  try {
    const hashedPassword = await _bcrypt.default.hash(password, 10);
    const user = new _userSchema.default({
      email: email,
      password: hashedPassword
    });
    await user.save();
    res.json(user).status(201);
  } catch (err) {
    res.json({
      error: err.message
    }).status(500);
  }
}
function getUsers(req, res) {
  console.log(req.user);
  if (req.user) {
    _userSchema.default.find({}, (err, data) => {
      err ? res.status(401).json({
        error: err.message
      }) : res.json(data);
    });
  } else {
    res.json({
      error: 'not authorized to access data',
      status: 'failed'
    });
  }
}
async function login(req, res) {
  const {
    email,
    password
  } = req.body;
  const user = await _userSchema.default.find({
    email: email
  }).exec();
  if (user[0] == null) {
    res.json({
      message: 'wrong user email'
    }).status(400);
  } else {
    if (await _bcrypt.default.compare(password, user[0].password)) {
      const accessToken = _jsonwebtoken.default.sign({
        email: email
      }, process.env.ACCESS_TOKEN_SECRET);
      res.json({
        message: `successfully loged in here is your access token`,
        token: accessToken,
        status: 'sucess'
      }).status(201);
    } else {
      res.json({
        message: 'wrong password'
      }).status(300);
    }
  }
}
async function deleteUser(req, res) {
  try {
    await _userSchema.default.find({
      email: req.params.email
    }).deleteOne();
    res.json({
      message: `successfully deleted user with email ${req.params.email}`,
      status: 'success'
    });
    _jsonwebtoken.default.revoke;
  } catch (err) {
    res.status(404).json({
      message: err.message,
      status: 'failed'
    });
  }
}
async function updateUser(req, res) {
  if (req.user.email == req.params.email) {
    try {
      const password = req.body.password;
      const hashedPassword = await _bcrypt.default.hash(password, 10);
      _userSchema.default.updateOne({
        email: req.params.email
      }, {
        password: hashedPassword
      }, (err, _data) => {
        err ? res.json({
          error: err.message,
          status: 'failed'
        }).status(402) : res.json({
          message: 'updated password',
          status: 'success'
        }).status(200);
      });
    } catch (err) {
      res.json({
        error: err.message,
        status: 'failed'
      }).status(402);
    }
  } else {
    res.json({
      error: "you can't update an account that isnt your own",
      status: 'failed'
    });
  }
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers['token'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({
    message: 'not authorized',
    status: 'failed'
  });
  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(401).json({
        message: err.message,
        status: 'failed'
      });
    } else {
      req.user = user;
      next();
    }
  });
}