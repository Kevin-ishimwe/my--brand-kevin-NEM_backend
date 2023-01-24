import app from './app';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
//connecting to Mbd and lsiten to port through that
dotenv.config();
const hosted = process.env.DB_LINK;
mongoose.set('strictQuery', true);
mongoose
  .connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(1011, () => {
      console.log('server running');
    });
    console.log('connected to dbs');
  })
  .catch((err) => {
    console.log(err.message);
  });
