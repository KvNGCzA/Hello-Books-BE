import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from '../middlewares/UserValidator';
import AuthController from '../controllers/AuthController';

const auth = express.Router();

const { createUser } = UserController;
const { login } = AuthController;
const { signUpValidation, loginValidation } = UserValidator;

auth.post('/signup', signUpValidation(), createUser);
auth.post('/login', loginValidation(), login);

export default auth;
