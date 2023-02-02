import express from 'express';
import cors from 'cors';
import MessageRoutes from './routes/messageRoutes.js';
import BlogRoutes from './routes/blogRoutes';
import { userRoutes } from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './documentation/documentation.js';
import cookieParser from 'cookie-parser'
const app = express();

app.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

//middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
{
  origin : true,
  credentials: true, 
}));
app.use(MessageRoutes);
app.use(BlogRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use((_req, res) => {
  res.status(404).json({ error: 'endpoint doesnt exist' });
});
export default app;
