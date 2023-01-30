const mongoose = require('mongoose');
import { isEmail } from 'validator';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter eamil'],
    unique: [true, 'the email id already exists '],
    lowercase: true,
    validate: [isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter the password'],
    minlength: [5, 'password must be atleast 5 charachers long'],
  },
});
const userModel = mongoose.model('users', userSchema);
export default userModel;
