"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBlogs = addBlogs;
exports.deleteBlogs = deleteBlogs;
exports.getBlogs = getBlogs;
exports.singleBlog = singleBlog;
exports.updateBlog = updateBlog;
var _blogSchema = _interopRequireDefault(require("../models/blogSchema"));
var _cloudnary = _interopRequireDefault(require("../utils/cloudnary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getBlogs(_req, res) {
  try {
    _blogSchema.default.find({}, (err, data) => {
      err ? res.json({
        error: err.message
      }) : res.status(200).json(data);
    }).populate('comments');
  } catch (err) {
    res.status(401).json({
      message: err.message,
      status: 'failed'
    });
  }
}
function singleBlog(req, res) {
  try {
    const blogid = req.params.id;
    _blogSchema.default.find({
      _id: blogid
    }, (err, data) => {
      err ? res.status(401).json({
        message: err.message,
        status: 'failed'
      }) : res.status(200).json(data);
    }).populate('comments');
  } catch (err) {
    res.json({
      error: err.message,
      status: 'failed'
    }).status(404);
  }
}
async function addBlogs(req, res) {
  if (req.user) {
    const {
      blogTitle,
      blogDescription,
      blogContent
    } = req.body;
    try {
      const result = await _cloudnary.default.uploader.upload(req.file.path);
      const blog = new _blogSchema.default({
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        blogImg: result.url,
        blogContent: blogContent,
        blogImgId: result.public_id
      });
      await blog.save();
      res.status(201).json({
        message: 'blog added',
        status: 'success'
      });
    } catch (err) {
      res.status(401).json({
        message: err.message,
        status: 'failed'
      });
    }
  }
}
async function deleteBlogs(req, res) {
  try {
    const blog = await _blogSchema.default.findById({
      _id: req.params.id
    });
    await _cloudnary.default.uploader.destroy(blog.blogImgId);
    await _blogSchema.default.findById({
      _id: req.params.id
    }).deleteOne();
    res.status(200).json({
      message: `${req.params.id} has been deleted`,
      status: 'success'
    });
  } catch (err) {
    res.json({
      message: err.message,
      status: 'failed'
    }).status(404);
  }
}
async function updateBlog(req, res) {
  if (req.user) {
    try {
      let blog = await _blogSchema.default.findById({
        _id: req.params.id
      });
      //delet the first image
      await _cloudnary.default.uploader.destroy(blog.blogImgId);
      //add new image
      const result = await _cloudnary.default.uploader.upload(req.file.path);
      //save with new document
      const {
        blogTitle,
        blogDescription,
        blogContent
      } = req.body;
      const data = {
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        blogImg: result.url,
        blogContent: blogContent,
        blogImgId: result.public_id
      };
      blog = await _blogSchema.default.updateOne({
        _id: req.params.id
      }, data, (err, _npd) => {
        if (err) {
          res.status(401).json({
            message: err.message,
            status: 'failed'
          });
        }
      }).clone();
      res.json({
        message: 'sucessfully updated blog',
        status: 'sucess'
      });
    } catch (err) {
      res.status(401).json({
        message: err.message,
        status: 'failed'
      });
    }
  }
}