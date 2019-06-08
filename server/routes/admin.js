import express from 'express';
import middlewares from '../middlewares';
import AuthorController from '../controllers/AuthorController';

const admin = express.Router();
const BASE_URL = '/admin';
const { verifyToken, authorizeUser, AuthorValidator } = middlewares;
const { addAuthor } = AuthorController;
const { authorValidation } = AuthorValidator;
const authorizeAdmin = authorizeUser(['admin']);

admin.post(`${BASE_URL}/author`, verifyToken, authorizeAdmin, authorValidation(), addAuthor);

export default admin;
