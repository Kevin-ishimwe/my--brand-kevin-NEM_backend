"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blog'
  },
  name: {
    type: String
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date()
  }
});
const commentModel = mongoose.model('comment', commentSchema);
var _default = commentModel;
exports.default = _default;