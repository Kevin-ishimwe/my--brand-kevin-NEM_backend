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
    if (process.env.NODE_ENV !== 'test') {
      try {
      app.listen(8000, () => {
          console.log(' production server running');
          console.log('connected to production dbs');
        });
      } catch (error) {
        console.log(error)
        
      }
    }
  });
  

