import express from 'express';
import auth from './auth';
import admin from './admin';

const router = express.Router();

router.use('/', admin, auth);

export default router;
