import blogModel from '../models/blogSchema';
import cloudinary from '../utils/cloudnary';

function getBlogs(_req, res) {
  try {
    blogModel
      .find({}, (err, data) => {
        err ? res.json({ error: err.message }) : res.status(200).json(data);
      })
      .populate('comments');
  } catch (err) {
    res.status(401).json({ message: err.message, status: 'failed' });
  }
}
function singleBlog(req, res) {
  try {
    const blogid = req.params.id;
    blogModel
      .find({ _id: blogid }, (err, data) => {
        err
          ? res.status(404).json({ message: err.message, status: 'failed' })
          : res.status(200).json(data);
      })
      .populate('comments');
  } catch (err) {
    res.status(400).json({ error: err.message, status: 'failed' });
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
      res.status(403).json({ message: err.message, status: 'failed' });
    }
  }
}
async function deleteBlogs(req, res) {
  try {
    const blog = await blogModel.findById({ _id: req.params.id });
    await cloudinary.uploader.destroy(blog.blogImgId);
    await blogModel.findById({ _id: req.params.id }).deleteOne();
    res.status(204).json({
      message: `deleted`,
      status: 'success',
    });
  } catch (err) {
    res.status(403).json({ message: err.message, status: 'failed' });
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
        .updateOne({ _id: req.params.id }, data, (err) => {
          if (err) {
            res.status(400).json({ message: err.message, status: 'failed' });
          }
        })
        .clone();
      res.json({ message: 'sucessfully updated blog', status: 'sucess' });
    } catch (err) {
      res.status(400).json({ message: err.message, status: 'failed' });
    }
  }
}

export { getBlogs, addBlogs, deleteBlogs, updateBlog, singleBlog };
