import QRCode from 'qrcode';
import { userModel } from '../../../models/user.model.js';
import { messageModel } from '../../../models/message.model.js';
import { createDocument, findDoc } from '../../../utils/dbMethods.js';
import { loggerService } from '../../../services/logger.services.js';
// import { prepareAudit } from '../../../audit/audit.service.js';
import { auditAction } from '../../../audit/auditAction.js';
import { auditModel } from '../../../models/audit.model.js';

const logger = new loggerService('message.controller');

//************************* SHARE PROFILE ********************** */

const shareProfile = async (req, res, next) => {
  //put url of add message here
  QRCode.toDataURL('http://localhost:7000/message', (err, qr) => {
    res.send(`<img src='${qr}'/>`);
  });
};

//************************* SEND MESSAGE ********************** */
const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { sendTo } = req.params; //from front end

  //check user
  //   const isUserExist = await userModel.findById(sendTo);
  //   if (!isUserExist) return res.status(400).json({ message: 'User not found' });

  const isUserExist = await findDoc(userModel, { _id: sendTo });
  if (!isUserExist.success)
    return res.status(isUserExist.status).json({ message: isUserExist.msg });

  //create message
  // const messageCreate = await messageModel.create({ content, sendTo }); //mongoose

  //create msg with dbMethod
  const createdDocument = await createDocument(messageModel, {
    content,
    sendTo,
  });
  // if (!messageCreate)
  //   return res.status(400).json({ message: 'message Not creation' });
  if (!createdDocument.success)
    return res
      .status(createdDocument.status)
      .json({ message: createdDocument.msg });

  return res.status(201).json({ message: 'message created successfully' });
};

//************************* DELETE MESSAGES ********************** */
const deleteMessage = async (req, res, next) => {
  const { loggedUserId, messageId } = req.query;
  const deleteMessage = await messageModel.findOneAndDelete({
    _id: messageId,
    sendTo: loggedUserId,
  });
  if (!deleteMessage)
    return next(new Error('Cannot Delete Message', { cause: 400 }));
  return res.status(201).json({ message: 'Message Deleted successfully' });
};

//************************* MARK MESSAGES AS VIEWED ********************** */
const markMsg = async (req, res, next) => {
  const { loggedUserId, messageId } = req.query;
  const markMessage = await messageModel.findOneAndUpdate(
    { _id: messageId, sendTo: loggedUserId },
    { isViewed: true, $inc: { __v: 1 } },
    { new: true }
  );
  if (!markMessage)
    return next(new Error('Cannot Mark Message as viewed', { cause: 400 }));
  return res
    .status(201)
    .json({ message: 'Message Marked as viewed successfully' });
};

//************************* LIST MESSAGES ********************** */
const listMsg = async (req, res, next) => {
  const { loggedUserId, isViewed } = req.query;
  const listMessage = await messageModel
    .find({ sendTo: loggedUserId, isViewed })
    .sort({ createdAt: -1 });
  // .sort({ createdAt: 1 });

  if (!listMessage.length)
    return next(new Error('Not Messages Fot U', { cause: 200 }));

  //logger
  logger.info('return message list', listMessage);

  //Audit service
  // prepareAudit(
  //   auditAction.GET_MSGS_LIST,
  //   listMessage,
  //   null,
  //   null,
  //   loggedUserId
  // );
  // const newAudit = await auditModel.create({
  //   action: auditAction.GET_MSGS_LIST,
  //   data: listMessage,
  //   status: 200,
  //   error: null,
  //   auditBy: loggedUserId,
  // });
  // if (!newAudit.success)
  //   return res
  //     .status(newAudit.status)
  //     .json({ message: createdDocument.msg });
  return res.status(200).json({
    message: 'Messages Listed successfully',
    messages: listMessage,
    // newAudit,
  });
};

const messageRender = async (req, res) => {
  res.render('messages', {
    message: await messageModel.find(),
    // message: this.messageModel.find(),
  });
};

export {
  shareProfile,
  sendMessage,
  deleteMessage,
  markMsg,
  listMsg,
  messageRender,
};
