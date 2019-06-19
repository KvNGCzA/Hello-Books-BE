import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';
import BookController from '../controllers/BookController';

const {
  favouriteAuthor, unfavouriteAuthor, favoriteBook, unfavoriteBook
} = UserController;
const { fetchBooks } = BookController;
const {
  verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation },
  BookValidator: { FavoriteBookValidation, FetchBookValidation }
} = middlewares;
const user = express.Router();
const FAVOURITES_BASE_URL = '/favourites/author/:authorId';
const BOOKS_BASE_URL = '/books';

// Favorite Author
user.post(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), favouriteAuthor);
// Unfavorite Author
user.delete(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), unfavouriteAuthor);
// Fetch Books
user.get(`${BOOKS_BASE_URL}`, FetchBookValidation(), fetchBooks);

// Favorite Book
user.post('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), favoriteBook);
// Unfavorite Book
user.delete('/favorites/book/:bookId', verifyToken, authorizeUser(['patron']), FavoriteBookValidation(), unfavoriteBook);

export default user;
