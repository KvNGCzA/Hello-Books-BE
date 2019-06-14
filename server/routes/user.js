import express from 'express';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import middlewares from '../middlewares';

const {
  favouriteAuthor, unfavouriteAuthor, favoriteBook, unfavoriteBook, editProfile
} = UserController;
const { fetchBooks } = BookController;
const {
  verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation },
  BookValidator: { FavoriteBookValidation, FetchBookValidation },
  UserValidator: { profileValidation }
} = middlewares;
const { getBorrowingStats } = BookController;

const user = express.Router();
const FAVOURITES_BASE_URL = '/favourites/author/:authorId';
const BOOKS_BASE_URL = '/books';

// Update User Profile
const UPDATE_BASE_URL = '/user/update';

// Favorite Author
user.post(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), favouriteAuthor);

// Unfavorite Author
user.delete(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), unfavouriteAuthor);

// Fetch Books
user.get(`${BOOKS_BASE_URL}`, FetchBookValidation(), fetchBooks);

// Update Profile
user.patch(`${UPDATE_BASE_URL}`, verifyToken, authorizeUser(['patron', 'superadmin', 'admin']), profileValidation(), editProfile);

// Favorite Book
user.post('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), favoriteBook);

// Unfavorite Book
user.delete('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), unfavoriteBook);

// route to get user book lending history
user.get('/user/lendinghistory', verifyToken, authorizeUser(['patron']), FetchBookValidation(), getBorrowingStats);

export default user;
