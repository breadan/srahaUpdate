import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Hello from the API');
});

export default userRouter;
