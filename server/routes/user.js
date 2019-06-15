import express from 'express';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import middlewares from '../middlewares';

const {
  favouriteAuthor, unfavouriteAuthor, favoriteBook, unfavoriteBook
} = UserController;
const {
  verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation },
  BookValidator: { FavoriteBookValidation }
} = middlewares;
const { getBooks } = BookController;

const user = express.Router();
const FAVOURITES_BASE_URL = '/favourites';

// Favorite Author
user.post(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), favouriteAuthor);

// Unfavorite Author
user.delete(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), unfavouriteAuthor);

// Favorite Book
user.post('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), favoriteBook);

// Unfavorite Book
user.delete('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), unfavoriteBook);

// search books
user.get('/books', getBooks);

export default user;
