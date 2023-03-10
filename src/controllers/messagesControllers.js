import messageModel from '../models/messsageSchema';

function getMessages(_req, res) {
  messageModel.find({}, (err, data) => {
    res.json(data).status(200);
  });
}

async function addMessages(req, res) {
  try {
    const { name, email, content } = req.body;
    const message = new messageModel({
      name: name,
      email: email,
      content: content,
    });
    await message.save();
    res.status(201).json({ message: 'message sent', status: 'success' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function deleteMessage(req, res) {
  try {
    await messageModel.findById({ _id: req.params.id }).deleteOne();
    res
      .status(200)
      .json({ message: `${req.params.id} has been delete`, status: 'sucess' });
  } catch (err) {
    console.log('something went wrong');
    res.status(401).json({ error: err.message });
  }
}

export { getMessages, addMessages, deleteMessage };
