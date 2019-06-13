import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';

const {
  favouriteAuthor, unfavouriteAuthor, favoriteBook, unfavoriteBook
} = UserController;
const {
  verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation },
  BookValidator: { FavoriteBookValidation }
} = middlewares;

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

export default user;
