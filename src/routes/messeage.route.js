import express from 'express';
import {
  deleteMessage,
  listMsg,
  markMsg,
  sendMessage,
  shareProfile,
} from '../modules/message/message.controller.js';
import auth from '../middleware/auth.middleware.js';
import userRoles from '../modules/user/user.roles.js';

const messageRouter = express.Router();

//********************* USE QR CODE TO SEND  MESSAGE ***************** */
messageRouter.get('/shareProfile', shareProfile);

//********************* Add MESSAGE ***************** */
messageRouter.post('/v1/sendMessage/:sendTo', sendMessage);

//********************* Delete MESSAGE ***************** */
messageRouter.delete(
  '/v1/deleteMessage',
  auth(userRoles.ADD_USER),
  deleteMessage
);

//********************* MARK MESSAGES AS VIEWED ***************** */
messageRouter.put('/v1/msgviewd', markMsg);

//********************* VIEW MESSAGES OF USER ***************** */
messageRouter.get('/v1/listMessage', listMsg);

export default messageRouter;
