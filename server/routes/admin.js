import express from 'express';
import middlewares from '../middlewares';
import AuthorController from '../controllers/AuthorController';
import AuthController from '../controllers/AuthController';
import AdminController from '../controllers/AdminController';
import BookController from '../controllers/BookController';

const { addBook } = BookController;
const { createUser } = AuthController;
const { changeUserStatus } = AdminController;
const { addAuthor, deleteAuthor, updateAuthor } = AuthorController;
const {
  verifyToken, authorizeUser, checkRole,
  BookValidator: { BookValidation },
  AuthorValidator: { authorValidation, favAuthorValidation },
  UserValidator: { createUserValidation, changeStatusValidation }
} = middlewares;

const admin = express.Router();
const BASE_URL = '/admin';

// Route to add author
admin.post(`${BASE_URL}/author`, verifyToken, authorizeUser(['superadmin', 'admin']), authorValidation(), addAuthor);

// Route to create user
admin.post(`${BASE_URL}/user`, verifyToken, authorizeUser(['superadmin', 'admin']), createUserValidation(), checkRole, createUser);

// Route to change user status (activate or deactivate)
admin.patch(`${BASE_URL}/user/:id`, verifyToken, authorizeUser(['superadmin', 'admin']), changeStatusValidation(), changeUserStatus);

// Route to add a book
admin.post(`${BASE_URL}/book`, verifyToken, authorizeUser(['superadmin', 'admin']), BookValidation(), addBook);

// Route to update author
admin.patch(`${BASE_URL}/author/:authorId`, verifyToken, authorizeUser(['superadmin', 'admin']), favAuthorValidation(), authorValidation(), updateAuthor);

// Route to delete author
admin.delete(`${BASE_URL}/author/:authorId`, verifyToken, authorizeUser(['superadmin', 'admin']), favAuthorValidation(), deleteAuthor);

export default admin;
