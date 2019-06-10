import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';

const { favouriteAuthor, unfavouriteAuthor } = UserController;
const { verifyToken, authorizeUser, AuthorValidator: { favAuthorValidation } } = middlewares;

const user = express.Router();
const FAVOURITES_BASE_URL = '/favourites';

user.post(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), favouriteAuthor);
user.delete(`${FAVOURITES_BASE_URL}`, verifyToken, authorizeUser(['patron']), favAuthorValidation(), unfavouriteAuthor);

export default user;
