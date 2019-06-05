import express from 'express';
import middlewares from '../middlewares';
import AuthorController from '../controllers/AuthorController';

const admin = express.Router();
const BASE_URL = '/admin';
const { AuthorValidator } = middlewares;
// const { verifyToken, authorizeUser, AuthorValidator } = middlewares;
const { addAuthor } = AuthorController;
const { authorValidation } = AuthorValidator;
// const authorizeAdmin = authorizeUser(['admin']);

admin.post(`${BASE_URL}/author`, authorValidation(), addAuthor);
// admin.post(`${BASE_URL}/author`, authorValidation(), verifyToken, authorizeAdmin, addAuthor);

export default admin;
