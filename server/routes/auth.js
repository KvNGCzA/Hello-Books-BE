import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';

const auth = express.Router();
const BASE_URL = '/auth';
const { createUser, login } = UserController;
const { signUpValidation, loginValidation } = UserValidator;

auth.post(`${BASE_URL}/signup`, signUpValidation(), createUser);
auth.post(`${BASE_URL}/login`, loginValidation(), login);

export default auth;
