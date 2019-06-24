import express from 'express';
import middlewares from '../middlewares';
import UserValidator from '../middlewares/UserValidator';
import AuthorController from '../controllers/AuthorController';
import AuthController from '../controllers/AuthController';
import AdminController from '../controllers/AdminController';
import BookController from '../controllers/BookController';

const admin = express.Router();
const BASE_URL = '/admin';
const {
  verifyToken, authorizeUser, AuthorValidator, BookValidator, checkRole
} = middlewares;
const { addBook } = BookController;
const { addAuthor, deleteAuthor, updateAuthor } = AuthorController;
const { changeUserStatus } = AdminController;
const { authorValidation, favAuthorValidation } = AuthorValidator;

const { BookValidation } = BookValidator;

const { createUser } = AuthController;
const { createUserValidation, changeStatusValidation } = UserValidator;
// route to add author
admin.post(`${BASE_URL}/author`, verifyToken, authorizeUser(['superadmin', 'admin']), authorValidation(), addAuthor);
// route for superadmin to create new users
admin.post('/admin/user', verifyToken, authorizeUser(['superadmin']), createUserValidation(), checkRole, createUser);
// route for admin and superadmin to activate or deactivate a user
admin.patch('/admin/user/:id', verifyToken, authorizeUser(['superadmin', 'admin']), changeStatusValidation(), changeUserStatus);
// Admin add book route
admin.post(`${BASE_URL}/book`, verifyToken, authorizeUser(['superadmin', 'admin']), BookValidation(), addBook);
// route to update author
admin.patch(`${BASE_URL}/author/:authorId`, verifyToken, authorizeUser(['superadmin', 'admin']), favAuthorValidation(), authorValidation(), updateAuthor);
// route to delete author
admin.delete(`${BASE_URL}/author/:authorId`, verifyToken, authorizeUser(['superadmin', 'admin']), favAuthorValidation(), deleteAuthor);

export default admin;
