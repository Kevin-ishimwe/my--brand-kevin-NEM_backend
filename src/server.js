import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//connecting to Mbd and lsiten to port through that
dotenv.config();
const hosted = process.env.DB_PRODUCTION_LINK;
//for production use only
const port = process.env.PORT || 1256;

// Listen on `port` and 0.0.0.0

mongoose.set('strictQuery', true);
mongoose
  .connect(hosted, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      try {
        app.listen(port,"0.0.0.0",() => {
          console.log(' production server running');
          console.log('connected to production dbs');
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
