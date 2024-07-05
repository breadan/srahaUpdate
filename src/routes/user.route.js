import express from 'express';
import signUpSchema from '../modules/user/user.validationSchema.js';
import {
  deleteUser,
  getUser,
  getUserProfile,
  signIn,
  signUp,
  updateUser,
  verify,
} from '../modules/user/user.controller.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import expressAsyncHandler from 'express-async-handler';
import auth from '../middleware/auth.middleware.js';
import userRoles from '../modules/user/user.roles.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Hello from the API');
});

//signupuser ************************************************
userRouter.post(
  '/v1/signupuser',
  validationMiddleware(signUpSchema),
  expressAsyncHandler(signUp)
);

//signinuser
userRouter.post('/v1/signinuser', expressAsyncHandler(signIn));

// get all users ************************************************
userRouter.get(
  '/v1/allusers',
  auth(userRoles.GET_ALL_USERS),
  expressAsyncHandler(getUserProfile)
);

// get user profile ************************************************
userRouter.get(
  '/v1/userprofile/:id',
  auth(userRoles.GET_USER),
  expressAsyncHandler(getUser)
);

//UPDATE USER ************************************************
userRouter.put(
  '/v1/updateuser',
  auth(userRoles.ADD_USER),
  expressAsyncHandler(updateUser)
);

//Delete USER ************************************************
userRouter.delete(
  '/v1/deleteuser',
  auth(userRoles.ADD_USER),
  expressAsyncHandler(deleteUser)
);

//Verify Email ************************************************
userRouter.get('/v1/verify/:token', verify);

export default userRouter;
