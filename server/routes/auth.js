import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/AuthController';
import middlewares from '../middlewares';
import helpers from '../helpers/index';

const { verifyToken, UserValidator } = middlewares;
const { Passport, PassportError } = helpers;
const auth = express.Router();
const BASE_URL = '/auth';
const {
  createUser, login, verifyUser, resetpasswordEmail, resetPassword, setupUserBySocialLogin,
} = AuthController;
const {
  signUpValidation, loginValidation, PasswordValidation, EmailValidation
} = UserValidator;
Passport(auth);
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
/* Route responsible for facebook login */
auth.get(`${BASE_URL}/facebook`, passport.authenticate('facebook', { scope: ['email'] }));
/* Route responsible for facebook callback */
auth.get(`${BASE_URL}/facebook/callback`, passport.authenticate('facebook', { failureRedirect: '/login' }), PassportError, setupUserBySocialLogin);
export default auth;
