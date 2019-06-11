import express from 'express';
import middlewares from '../middlewares';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';

const {
  editProfile, favouriteAuthor, unfavouriteAuthor, favouriteBook, unfavouriteBook, borrowBook
} = UserController;
const { fetchBooks } = BookController;
const {
  verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation },
  BookValidator: { FavouriteBookValidation, FetchBookValidation },
  UserValidator: { profileValidation },
  BorrowValidator: { BorrowValidation }
} = middlewares;
const user = express.Router();
const BASE_URL = '/user';
const BOOKS_URL = '/books';
const FAVOURITE_URL = '/favourite';

// Route to fetch books
user.get(`${BOOKS_URL}`, FetchBookValidation(), fetchBooks);

// Route to favourite an author
user.post(`${FAVOURITE_URL}/author/:authorId`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), favouriteAuthor);

// Route to unfavourite an author
user.delete(`${FAVOURITE_URL}/author/:authorId`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), unfavouriteAuthor);

// Route to favourite book
user.post(`${FAVOURITE_URL}/book/:bookId`, verifyToken, authorizeUser(['patron']), FavouriteBookValidation(), favouriteBook);

// Route to unfavorite book
user.delete(`${FAVOURITE_URL}/book/:bookId`, verifyToken, authorizeUser(['patron']), FavouriteBookValidation(), unfavouriteBook);

// Route to update profile
user.patch(`${BASE_URL}/update`, verifyToken, authorizeUser(['patron', 'superadmin', 'admin']), profileValidation(), editProfile);

// Route to borrow a book
user.post('/borrow', verifyToken, authorizeUser(['patron']), BorrowValidation(), borrowBook);

export default user;
