import express from 'express';
import middlewares from '../middlewares';
import UserValidator from '../middlewares/UserValidator';
import AuthorController from '../controllers/AuthorController';
import AdminController from '../controllers/AdminController';
import AuthController from '../controllers/AuthController';

const admin = express.Router();
const BASE_URL = '/admin';
const { verifyToken, authorizeUser, AuthorValidator } = middlewares;
const { addAuthor } = AuthorController;
const { changeUserStatus, findPatrons } = AdminController;
const { createUser } = AuthController;
const { authorValidation } = AuthorValidator;
const authorizeAdmin = authorizeUser(['admin']);
const { createUserValidation, changeStatusValidation } = UserValidator;

admin.post(`${BASE_URL}/author`, verifyToken, authorizeAdmin, authorValidation(), addAuthor);
admin.post('/admin/user', verifyToken, authorizeUser(['superadmin']), createUserValidation(), createUser);
admin.patch('/admin/user/:id', verifyToken, authorizeUser(['superadmin']), changeStatusValidation(), changeUserStatus);
admin.get(`${BASE_URL}/patrons`, verifyToken, authorizeAdmin, findPatrons);
admin.get(`${BASE_URL}/patrons?status`, verifyToken, authorizeAdmin, findPatrons);

export default admin;
