"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMessages = addMessages;
exports.deleteMessage = deleteMessage;
exports.getMessages = getMessages;
var _messsageSchema = _interopRequireDefault(require("../models/messsageSchema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getMessages(_req, res) {
  _messsageSchema.default.find({}, (err, data) => {
    err ? res.json({
      error: err.message
    }).status(401) : res.json(data).status(200);
  });
}
async function addMessages(req, res) {
  const {
    name,
    email,
    content
  } = req.body;
  const message = new _messsageSchema.default({
    name: name,
    email: email,
    content: content
  });
  try {
    await message.save();
    res.status(201).json({
      message: 'message sent',
      status: 'success'
    });
  } catch (err) {
    res.json({
      error: err.message
    }).status(401);
  }
}
async function deleteMessage(req, res) {
  console.log(req.params.id);
  try {
    await _messsageSchema.default.findById({
      _id: req.params.id
    }).deleteOne();
    res.status(200).json({
      message: `${req.params.id} has been delete`,
      status: 'sucess'
    });
  } catch (err) {
    res.status(401).json({
      error: err.message
    });
  }
}