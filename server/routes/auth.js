import express from 'express';
import AuthController from '../controllers/AuthController';

import middlewares from '../middlewares';

const { verifyToken, UserValidator } = middlewares;

const auth = express.Router();
const BASE_URL = '/auth';
const { createUser, login, verifyUser } = AuthController;
const { signUpValidation, loginValidation } = UserValidator;

auth.post(`${BASE_URL}/signup`, signUpValidation(), createUser);
auth.post(`${BASE_URL}/login`, loginValidation(), login);
auth.get(`${BASE_URL}/verify`, verifyToken, verifyUser);

export default auth;
