import express from 'express';
import AuthorValidator from '../middlewares/AuthorValidator';
import AuthorController from '../controllers/AuthorController';

const admin = express.Router();
const BASE_URL = '/admin';
const { addAuthor } = AuthorController;
const { addAuthorValidation } = AuthorValidator;

admin.post(`${BASE_URL}/author`, addAuthorValidation(), addAuthor);

export default admin;
