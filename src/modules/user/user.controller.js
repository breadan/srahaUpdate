import { userModel } from '../../../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenModel from '../../../models/token.model.js';
import { sendEmail } from '../../../utils/nodemailor.js';

//************************* Signup********************** */
const signUp = async (req, res, next) => {
  const { userName, email, password, age } = req.body;
  //email check
  const isEmailExists = await userModel.findOne({ email });
  if (isEmailExists) {
    return next(new Error('Email is Already exists', { cause: 409 }));
  }
  //name check
  const isNameExists = await userModel.findOne({ userName });
  if (isNameExists) {
    return next(new Error('Name is Already exists', { cause: 409 }));
  }
  //hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  //create
  const newUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
    age,
    // gender,
  });
  sendEmail({ email });
  return res
    .status(201)
    .json({ message: 'User created successfully', newUser });
};

//************************* SignIn ********************** */
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const isEmailExists = await userModel.findOne({ email });
  if (!isEmailExists || !isEmailExists.verified) {
    return next(
      new Error('invalid login credentials Or Email Not Verified!', {
        cause: 404,
      })
    );
  }
  //compare password
  const isPasswordMatched = await bcrypt.compare(
    req.body.password,
    isEmailExists.password
  );
  if (!isPasswordMatched) {
    return next(new Error('invalid login credentials', { cause: 404 }));
  }
  //Token
  const token = jwt.sign(
    {
      _id: isEmailExists._id,
      email: isEmailExists.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIR, algorithm: 'HS256' }
  );
  //create token
  //timer in mongoose
  const expireAt = new Date();
  expireAt.setTime(expireAt.getTime() + 1000 * 60 * 4);
  await tokenModel.create({ token, userId: isEmailExists._id, expireAt });

  return res.status(200).json({ message: 'User login successfully', token });
};

//************************* get All users********************** */
const getUserProfile = async (req, res) => {
  const users = await userModel.find().select('-password');
  if (users) {
    return res.status(201).json({ data: { users } });
  } else {
    next(new Error('Internal Server Error', { cause: 404 }));
  }
};

//************************* get user ********************** */
const getUser = async (req, res, next) => {
  const { _id } = req.params;
  const user = await userModel.findById(_id);
  if (!user) {
    return new Error('Invalid user id', { cause: 400 });
  }
  res.json({ message: 'Done', user });
};

//************************* UPDATE USER ********************** */
const updateUser = async (req, res, next) => {
  const { userName, email, age } = req.body;
  if (email) {
    const isEmailExists = await userModel.findOne({ email });
    if (isEmailExists) {
      return next(new Error('invalid login update', { cause: 404 }));
    }
  }
  const { _id } = req.user; //from auth
  console.log(_id);
  const user = await userModel.findByIdAndUpdate(
    _id,
    { userName, email, age },
    { new: true }
  );
  if (!updateUser) {
    return next(new Error('update failed', { cause: 404 }));
  }
  res.status(200).json({ message: 'User update', user });
};

//************************* DELETE USER ********************** */
const deleteUser = async (req, res, next) => {
  const { _id } = req.user; //from auth
  const user = await userModel.findByIdAndDelete(_id);
  if (!deleteUser) {
    return next(new Error('update failed', { cause: 404 }));
  }
  const { token } = req.headers;
  const userToken = await tokenModel.findOneAndDelete(token);

  res.status(200).json({ message: 'User delete & token' });
};

//************************* VERIFY EMAIL ********************** */
const verify = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    if (!decoded || !decoded.email) {
      return next(
        new Error('Token is invalid or does not contain an email', {
          cause: 403,
        })
      );
    }
    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { verified: true }
    );
    res.status(200).json({
      message: 'Email Verified! Controller',
    });
  } catch (err) {
    console.error(err);
    return next(new Error(`Token Error: ${err.message}`, { cause: 403 }));
  }
};

export {
  signUp,
  signIn,
  getUserProfile,
  updateUser,
  deleteUser,
  getUser,
  verify,
};
