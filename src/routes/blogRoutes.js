import express from 'express';
const BlogRoutes = express.Router();
import { authenticateToken } from './userRoutes';
import upload from '../utils/multer';
import {
  getBlogs,
  addBlogs,
  deleteBlogs,
  updateBlog,
  singleBlog,
} from '../controllers/blogControllers';


BlogRoutes.get('/getblogs', getBlogs);
BlogRoutes.get('/singleblog/:id', singleBlog);


BlogRoutes.post(
  '/addblog',
  authenticateToken,
  upload.single('blogImg'),
  addBlogs
);

BlogRoutes.delete('/deleteblog/:id',authenticateToken,upload.single('blogImg'),deleteBlogs);

BlogRoutes.put(
  '/updateblog/:id',
  authenticateToken,
  upload.single('blogImg'),
  updateBlog
);

export default BlogRoutes;
