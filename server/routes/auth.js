import express from 'express';
import AuthController from '../controllers/AuthController';


import middlewares from '../middlewares';

const { verifyToken, UserValidator } = middlewares;
const auth = express.Router();
const BASE_URL = '/auth';
const {
  createUser, login, verifyUser, resetpasswordEmail, resetPassword
} = AuthController;
const {
  signUpValidation, loginValidation, PasswordValidation, EmailValidation
} = UserValidator;
// Sign up route
auth.post(`${BASE_URL}/signup`, signUpValidation(), createUser);
/* Login route */
auth.post(`${BASE_URL}/login`, loginValidation(), login);
/* Verify User route */
auth.get(`${BASE_URL}/verify`, verifyToken, verifyUser);
/* route responsible for sending password reset link to owners mail */ 
auth.post(`${BASE_URL}/passwordreset`, EmailValidation(), resetpasswordEmail);
/* route responsible for password reset when mail has been sent */
auth.patch(`${BASE_URL}/passwordresetVerify`, verifyToken, PasswordValidation(), resetPassword);

export default auth;
