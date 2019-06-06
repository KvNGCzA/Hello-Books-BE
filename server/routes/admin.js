import express from 'express';
import middlewares from '../middlewares';
import UserValidator from '../middlewares/UserValidator';
import AuthorController from '../controllers/AuthorController';
import AuthController from '../controllers/AuthController';
import AdminController from '../controllers/AdminController';

const admin = express.Router();
const BASE_URL = '/admin';
const { verifyToken, authorizeUser, AuthorValidator } = middlewares;
const { addAuthor } = AuthorController;
const { changeUserStatus } = AdminController;
const { authorValidation } = AuthorValidator;
const authorizeAdmin = authorizeUser(['admin']);

admin.post(`${BASE_URL}/author`, verifyToken, authorizeAdmin, authorValidation(), addAuthor);
// admin.post(`${BASE_URL}/author`, authorValidation(), verifyToken, authorizeAdmin, addAuthor);
const { createUser } = AuthController;
const { createUserValidation, changeStatusValidation } = UserValidator;

admin.post('/admin/user', verifyToken, authorizeUser(['superadmin']), createUserValidation(), createUser);
admin.patch('/admin/user/:id', verifyToken, authorizeUser(['superadmin']), changeStatusValidation(), changeUserStatus);

export default admin;
