import express from 'express';

const messageRouter = express.Router();

messageRouter.get('/', (req, res) => {
  res.send('Hello from the message');
});

export default messageRouter;
