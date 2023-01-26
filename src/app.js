import express from 'express';
import cors from 'cors';
import MessageRoutes from './routes/messageRoutes.js';
import BlogRoutes from './routes/blogRoutes';
import { userRoutes } from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './documentation/documentation.js';

const app = express();

app.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

//middleware
app.use(express.json());
app.use(cors());
app.use(MessageRoutes);
app.use(BlogRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use((_req, res) => {
  res.status(404).json({ error: 'endpoint doesnt exist' })
});
export default (app)