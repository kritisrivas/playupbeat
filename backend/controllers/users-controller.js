const uuid = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/users')

const generateToken = (user) => {
    return jwt.sign({userId: user.id, email: user.email, role: user.role},
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    );
}
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password, role } = req.body;
  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password, 12)
  } catch(err){
    const error = new HttpError('Could not create user, please try again', 500)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  let token;
  token = generateToken(createdUser);

  res.status(201).json({userId: createdUser.id, email: createdUser.email, role: createdUser.role, token: token});

};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try{
    identifiedUser = await User.findOne({email: email})
  }
  catch(err){
     const error = new HttpError('Something went wrong, could not login', 500)
  }

  if (!identifiedUser) {
    return next( new HttpError('Could not identify user, credentials seem to be wrong.', 401));
  }
  
  let isValidPassword;
  try{
    isValidPassword = await bcrypt.compare(password, identifiedUser.password)
  }catch(err){
    const error = new HttpError('Could not log you in, please check your credentials', 500)
    return next(error);
  }
  if(!isValidPassword){
    return next( new HttpError('Could not identify user, credentials seem to be wrong.', 401));
  }

  let token;
  token = generateToken(identifiedUser);

  res.json({userId: identifiedUser.id, email: identifiedUser.email, role: identifiedUser.role, token: token});
};

// exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
