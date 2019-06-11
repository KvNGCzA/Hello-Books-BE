import express from 'express';
import middlewares from '../middlewares';
import AuthController from '../controllers/AuthController';

const { verifyToken, UserValidator } = middlewares;
const {
  createUser, login, verifyUser, resetpasswordEmail, resetPassword
} = AuthController;
const {
  signUpValidation, loginValidation, PasswordValidation, EmailValidation
} = UserValidator;

const auth = express.Router();
const BASE_URL = '/auth';

// Route to signup
auth.post(`${BASE_URL}/signup`, signUpValidation(), createUser);

// Route to login
auth.post(`${BASE_URL}/login`, loginValidation(), login);

// Route to verify a user
auth.get(`${BASE_URL}/verify`, verifyToken, verifyUser);

/* Route responsible for sending password reset link to owners mail */
auth.post(`${BASE_URL}/passwordreset`, EmailValidation(), resetpasswordEmail);

/* Route responsible for password reset when mail has been sent */
auth.patch(`${BASE_URL}/passwordresetverify`, verifyToken, PasswordValidation(), resetPassword);

export default auth;
