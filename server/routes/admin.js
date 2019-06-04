import express from 'express';
import AdminController from '../controllers/adminController';

const admin = express.Router();

const { addBook } = AdminController;

admin.post('/addBook', addBook);

export default admin;
