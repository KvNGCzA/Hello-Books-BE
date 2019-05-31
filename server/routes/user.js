import express from 'express';
import UserController from '../controllers/userController';

const user = express.Router();

const { createUser } = UserController;

user.post('/signup', createUser);

export default user;
