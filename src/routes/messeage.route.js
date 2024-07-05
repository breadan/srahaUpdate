import express from 'express';
import { shareProfile } from '../modules/message/message.controller.js';

const messageRouter = express.Router();

//********************* USE QR CODE TO SEND  MESSAGE ***************** */
messageRouter.get('/shareProfile', shareProfile);

//********************* Add MESSAGE ***************** */

export default messageRouter;
