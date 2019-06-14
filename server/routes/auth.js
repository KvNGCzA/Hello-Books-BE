import express from 'express';
import AuthController from '../controllers/AuthController';
import BookController from '../controllers/BookController';


import middlewares from '../middlewares';

const { verifyToken, UserValidator } = middlewares;

const auth = express.Router();
const BASE_URL = '/auth';
const { createUser, login, verifyUser } = AuthController;
const { filterBook } = BookController;
const { signUpValidation, loginValidation } = UserValidator;

// Sign up route
auth.post(`${BASE_URL}/signup`, signUpValidation(), createUser);
// Login route
auth.post(`${BASE_URL}/login`, loginValidation(), login);
// Verify User route
auth.get(`${BASE_URL}/verify`, verifyToken, verifyUser);
// filter route
auth.get(`${BASE_URL}/search`, filterBook);


export default auth;
