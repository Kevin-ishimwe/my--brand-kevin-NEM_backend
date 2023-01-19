import express from 'express';
import messageModel from '../models/messsageSchema';

function getMessages(req, res) {
  messageModel.find({}, (err, data) => {
    err ? console.log(err) : res.json(data).status(200);
  });
}

async function addMessages(req, res) {
  const { name, email, content } = req.body;
  const message = new messageModel({
    name: name,
    email: email,
    content: content,
  });
  try {
    await message.save();
    res.json({ message: 'message sent', status: 'success' });
  } catch (err) {
    res.json({ error: err.message }).status(401);
  }
}
async function deleteMessage(req, res) {
try {
   await messageModel.findById({ _id: req.params.id }).deleteOne();
   res.json({ message: `${req.params.id} has been delete`, status: 'sucess' });

  
} catch (error) {
  res.json({error:err.message}).status(401)
  
} 

}

module.exports = {
  getMessages: getMessages,
  addMessages: addMessages,
  deleteMessage: deleteMessage,
};
