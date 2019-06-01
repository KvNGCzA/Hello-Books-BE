import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from '../middlewares/UserValidator';

const auth = express.Router();

const { createUser } = UserController;
const { signUpValidation } = UserValidator;

auth.post('/signup', signUpValidation(), createUser);

export default auth;
