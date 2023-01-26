"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addComment = addComment;
exports.deleteComments = deleteComments;
exports.getComments = getComments;
var _commentSchema = _interopRequireDefault(require("../models/commentSchema"));
var _blogSchema = _interopRequireDefault(require("../models/blogSchema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//add comments
async function addComment(req, res) {
  try {
    const {
      comment,
      name
    } = req.body;
    const newComment = new _commentSchema.default({
      blog: req.params.id,
      name: name,
      comment: comment
    });
    await newComment.save();
    await _blogSchema.default.find({
      _id: req.params.id
    }).updateOne({
      _id: req.params.id
    }, {
      $addToSet: {
        comments: newComment
      }
    }, (err, _data) => {
      err ? res.status(401).json({
        error: err.message
      }) : res.status(200).json({
        message: 'comment added',
        status: 'sucess'
      });
    }).clone();
  } catch (err) {
    res.json({
      message: err.message,
      status: 'failed'
    }).status(402);
  }
}
//get comments priviledged
function getComments(_req, res) {
  try {
    _commentSchema.default.find({}, (err, data) => {
      err ? res.status(401).json({
        message: 'failed',
        status: 'failed'
      }) : res.status(200).json(data);
    });
  } catch (err) {
    res.json({
      message: err.message,
      status: 'failed'
    }).status(403);
  }
}
//delete comment with this specific id

async function deleteComments(req, res) {
  try {
    await _commentSchema.default.find({
      _id: req.params.id
    }).deleteOne();
    res.status(200).json({
      message: 'comment deleted',
      status: 'success'
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
      status: 'failed'
    });
  }
}