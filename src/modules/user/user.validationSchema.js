import Joi from 'joi';

//custom rule
const ageRule = (value, helper) => {
  if (value < 15 || value > 80) {
    // return helper.message('Age must be between 15 and 80');
    // return helper.error('any.invalid');
    throw new Error('Age must be between 15 and 80');
  }
  return value;
};

const signUpSchema = {
  body: Joi.object({
    userName: Joi.string()
      .trim()
      .required()
      .min(5)
      .max(20)
      .alphanum()
      .default('Breadan'),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
    age: Joi.number().integer().positive().required().custom(ageRule),
    gender: Joi.string().valid('male', 'female'),
  })
    //to create all required fields
    //.options({presence: 'required'})
    .with('password', 'confirm_password') //delete required fields
    .with('email', 'password'),
};

export default signUpSchema;
