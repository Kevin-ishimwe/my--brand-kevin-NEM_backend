import mongoose from 'mongoose';
import dotenv from 'dotenv';
//connecting to Mbd and lsiten to port through that
dotenv.config();
import express from 'express';
import cors from 'cors';
import MessageRoutes from './routes/messageRoutes.js';
import BlogRoutes from './routes/blogRoutes';
import { userRoutes } from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from '../documentation/documentation.js';

const testServer = express();

testServer.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

//middleware
testServer.use(express.json());
testServer.use(cors());
testServer.use(MessageRoutes);
testServer.use(BlogRoutes);
testServer.use(userRoutes);
testServer.use(commentRoutes);
testServer.use((_req, res) => {
  res.status(404).json({ error: 'endpoint doesnt exist' });
});
const hosted = process.env.DB_LINK;
mongoose.set('strictQuery', true);
mongoose
.connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    testServer.listen(1050, () => {
    });
})
.catch((err) => {
    console.log(err.message);
  });

    export default testServer;