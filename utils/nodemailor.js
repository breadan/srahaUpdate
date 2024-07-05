// all this from nodemailor
import nodemailer from 'nodemailer';
import { htmlCode } from './html.js';
import jwt from 'jsonwebtoken';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.APP_EMAIL_ADDRESS,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  const token = jwt.sign({ email: options.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIR,
  });
  console.log(token);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.APP_EMAIL_ADDRESS, // sender address
    to: options.email, // list of receivers
    subject: 'Welcome Our Site', // Subject line
    html: htmlCode(token), // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
