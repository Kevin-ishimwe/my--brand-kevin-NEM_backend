import commentModel from '../models/commentSchema';
import blogModel from '../models/blogSchema';

//add comments
async function addComment(req, res) {
  try {
    const { comment, name } = req.body;
    const newComment = new commentModel({
      blog: req.params.id,
      name: name,
      comment: comment,
    });
    await newComment.save();

    await blogModel
      .find({ _id: req.params.id })
      .updateOne(
        { _id: req.params.id },
        { $addToSet: { comments: newComment } },
        () => {
          res.status(200).json({ message: 'comment added', status: 'sucess' });
        }
      )
      .clone();
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message, status: 'failed' })
      .status(402);
  }
}
//get comments priviledged
function getComments(_req, res) {
  commentModel.find({}, (_err, data) => {
    res.status(200).json(data);
  });
}
//delete comment with this specific id

async function deleteComments(req, res) {
  try {
    await commentModel.find({ _id: req.params.id }).deleteOne();
    res.status(200).json({ message: 'comment deleted', status: 'success' });
  } catch (err) {
    res.status(404).json({ message: err.message, status: 'failed' });
  }
}

export { addComment, getComments, deleteComments };
