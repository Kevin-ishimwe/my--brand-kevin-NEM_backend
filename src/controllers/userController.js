import userModel from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function addUser(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message.split(':')[2] });
  }
}
function getUsers(req, res) {
  if (req.user) {
    userModel.find({}, (err, data) => {
      err
        ? res.status(401).json({ error: err.message })
        : res.status(200).json(data);
    });
  } else {
    res.json({ error: 'not authorized to access data', status: 'failed' });
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.find({ email: email }).exec();
  if (user[0] == null) {
    res.status(404).json({ message: 'wrong user email' });
  } else {
    if (await bcrypt.compare(password, user[0].password)) {
      const accessToken = generateAuthtoken(email);
      const refreshToken = jwt.sign(
        { email: email },
        process.env.REFRESH_TOKEN_SECRET
      );
      res.status(200).setHeader('Set-Cookie', `token=${accessToken} `).json({
        message: `successfully loged in here is your access token`,
        token: accessToken,
        status: 'sucess',
      });
    } else {
      res.status(400).json({ message: 'wrong password' });
    }
  }
}

async function deleteUser(req, res) {
  try {
    await userModel.find({ email: req.params.email }).deleteOne();
    res.status(204).json({
      message: `successfully deleted user`,
      status: 'success',
    });
    jwt.revoke;
  } catch (err) {
    res.status(404).json({ message: err.message, status: 'failed' });
  }
}

async function updateUser(req, res) {
  if (req.user.email == req.params.email) {
    try {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      userModel.updateOne(
        { email: req.params.email },
        { password: hashedPassword },
        (err) => {
          err
            ? res.json({ error: err.message, status: 'failed' }).status(402)
            : res
                .json({ message: 'updated password', status: 'success' })
                .status(200);
        }
      );
    } catch (err) {
      res.status(403).json({ error: err.message, status: 'failed' });
    }
  } else {
    res.json({
      error: "you can't update an account that isnt your own",
      status: 'failed',
    });
  }
}
function generateAuthtoken(email) {
  const accessToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET
    //  { expiresIn: '5min' }
  );
  return accessToken;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['token'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res
      .status(401)
      .json({ message: 'not authorized', status: 'failed' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(401).json({ message: err.message, status: 'failed' });
    } else {
      req.user = user;
      next();
    }
  });
}

export { addUser, getUsers, login, deleteUser, updateUser, authenticateToken };
