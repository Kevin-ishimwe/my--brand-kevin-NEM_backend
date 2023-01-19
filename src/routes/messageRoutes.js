import express from 'express';
const MessageRoutes = express.Router();
import { authenticateToken } from './userRoutes';
import {
  getMessages,
  addMessages,
  deleteMessage,
} from '../controllers/messagesControllers';

//get messages
MessageRoutes.get('/getmessages', authenticateToken, getMessages);
//add messages
MessageRoutes.post('/addmessages',addMessages);
MessageRoutes.delete('/deletemessage/:id',authenticateToken,deleteMessage);
//there wont be any need for an update route since messages dont need updates
export default MessageRoutes;
