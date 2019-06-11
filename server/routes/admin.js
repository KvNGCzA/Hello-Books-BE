import express from 'express';
import middlewares from '../middlewares';
import UserValidator from '../middlewares/UserValidator';
import AuthorController from '../controllers/AuthorController';
<<<<<<< HEAD
import AuthController from '../controllers/AuthController';
import AdminController from '../controllers/AdminController';
=======
import AdminController from '../controllers/AdminController';

>>>>>>> 166575207-story(admin):findPatrons

const admin = express.Router();
const BASE_URL = '/admin';
const { verifyToken, authorizeUser, AuthorValidator } = middlewares;
const { addAuthor } = AuthorController;
<<<<<<< HEAD
const { changeUserStatus } = AdminController;
=======
const { findPatrons } = AdminController;
>>>>>>> 166575207-story(admin):findPatrons
const { authorValidation } = AuthorValidator;
const authorizeAdmin = authorizeUser(['admin']);

admin.post(`${BASE_URL}/author`, verifyToken, authorizeAdmin, authorValidation(), addAuthor);
<<<<<<< HEAD
// admin.post(`${BASE_URL}/author`, authorValidation(), verifyToken, authorizeAdmin, addAuthor);
const { createUser } = AuthController;
const { createUserValidation, changeStatusValidation } = UserValidator;

admin.post('/admin/user', verifyToken, authorizeUser(['superadmin']), createUserValidation(), createUser);
admin.patch('/admin/user/:id', verifyToken, authorizeUser(['superadmin']), changeStatusValidation(), changeUserStatus);

=======
admin.get(`${BASE_URL}/patrons`, verifyToken, authorizeAdmin, findPatrons);
admin.get(`${BASE_URL}/patrons?status`, verifyToken, authorizeAdmin, findPatrons);
>>>>>>> 166575207-story(admin):findPatrons
export default admin;
