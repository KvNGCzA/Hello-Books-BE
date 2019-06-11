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

const { createUser } = AuthController;
const { createUserValidation, changeStatusValidation } = UserValidator;
// route to add author
admin.post(`${BASE_URL}/author`, verifyToken, authorizeUser(['superadmin', 'admin']), authorValidation(), addAuthor);
// route for superadmin to create new users
admin.post('/admin/user', verifyToken, authorizeUser(['superadmin']), createUserValidation(), createUser);
// route for superadmin to activate or deactivate a user
admin.patch('/admin/user/:id', verifyToken, authorizeUser(['superadmin']), changeStatusValidation(), changeUserStatus);

export default admin;
