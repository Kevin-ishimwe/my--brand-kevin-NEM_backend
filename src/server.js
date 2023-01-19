import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import MessageRoutes from './routes/messageRoutes.js';
import BlogRoutes from './routes/blogRoutes';
import { userRoutes } from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from '../helper/documentation.js';


const app = express();

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

//middleware
app.use(express.json());
app.use(cors());
app.use(MessageRoutes);
app.use(BlogRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use((req, res) => {
  res.json({ error: 'endpoint doesnt exist' }).status(404);
});

//connecting to Mbd and lsiten to port through that
dotenv.config();
const hosted = process.env.DB_LINK;

mongoose.set('strictQuery', true);
mongoose
  .connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(1010, () => {
      console.log('server running');
    });
    console.log('connected to dbs');
  })
  .catch((err) => {
    console.log(err);
  });
