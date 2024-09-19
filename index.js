import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import './config/connection.js';
import userRouter from './src/routes/user.route.js';
import messageRouter from './src/routes/message.route.js';
import { loggerService } from './services/logger.services.js';
import { messageRender } from './src/modules/message/message.controller.js';

const logger = new loggerService('message.controller');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 7000;
const mode = process.env.NODE_ENV;

//secure 2
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); //__dirname it is server

//pug 1
app.set('views', './views');
app.set('view engine', 'pug');
//pug 2
app.get('/message', (req, res) => {
  res.render('message', {
    // MessageTitle: 'Message list',
    // content: 'this is awesome',
    message: messageRender(req, res), //??
  });
});
// Routes
app.use('/user', userRouter);
app.use('/api/message', messageRouter);

app.get('/*', (req, res) => {
  res.render('notFound');
});
app.all('*', (req, res, next) => {
  return next(new Error(`page Not Found: ${req.url}`, { cause: 404 }));
});

//global error handling routes
app.use((err, req, res, next) => {
  const statusCode = err.cause || 500;
  return res.status(statusCode).json({ message: err.message });
});
// app.get('/', (req, res) => res.send(' World!'));//notFound

app.listen(port, () => {
  logger.info('listening on port' + port);
  // console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
