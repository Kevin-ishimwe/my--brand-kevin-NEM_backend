import blogModel from '../models/blogSchema';
import cloudinary from '../utils/cloudnary';

async function getBlogs(req, res) {
  try {
    blogModel
      .find({}, (err, data) => {
        err ? res.json({ error: err.message }) : res.status(200).json(data)
      })
      .populate('comments');
  } catch (err) {
    res.status(401).json({ message: err.message, status: 'failed' });
  }
}
async function singleBlog(req, res) {
  try {
    const blogid = req.params.id;
    blogModel.find({ _id: blogid }, (err, data) => {
      err
        ? res.status(401).json({ message: err.message, status: 'failed' })
        : res.status(200).json(data);
    }).populate("comments");
  } catch (err) {
    res.json({ error: err.message, status: 'failed' }).status(404);
  }
}

async function addBlogs(req, res) {
  if (req.user) {
    const { blogTitle, blogDescription, blogContent } = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const blog = new blogModel({
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        blogImg: result.url,
        blogContent: blogContent,
        blogImgId: result.public_id,
      });
      await blog.save();
      res.status(201).json({ message: 'blog added', status: 'success' });
    } catch (err) {
      res.status(401).json({ message: err.message, status: 'failed' });
    }
  }
}
async function deleteBlogs(req, res) {
  try {
    let blog = await blogModel.findById({ _id: req.params.id });
    await cloudinary.uploader.destroy(blog.blogImgId);

    await blogModel.findById({ _id: req.params.id }).deleteOne();
    res.status(200).json({
      message: `${req.params.id} has been deleted`,
      status: 'success',
    });
  } catch (err) {
    res.json({ message: err.message, status: 'failed' }).status(404);
  }
}

async function updateBlog(req, res) {
  if (req.user) {
    try {
      let blog = await blogModel.findById({ _id: req.params.id });
      //delet the first image
      await cloudinary.uploader.destroy(blog.blogImgId);
      //add new image
      const result = await cloudinary.uploader.upload(req.file.path);
      //save with new document
      const { blogTitle, blogDescription, blogContent } = req.body;
      const data = {
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        blogImg: result.url,
        blogContent: blogContent,
        blogImgId: result.public_id,
      };

      blog = await blogModel
        .updateOne({ _id: req.params.id }, data, (err, npd) => {})
        .clone();
      res.json({ message: 'sucessfully updated blog', status: 'sucess' });
    } catch (err) {
      res.json({ message: err.message, status: 'failed' });
    }
  }
}

module.exports = {
  getBlogs: getBlogs,
  addBlogs: addBlogs,
  deleteBlogs: deleteBlogs,
  updateBlog: updateBlog,
  singleBlog: singleBlog,
};
