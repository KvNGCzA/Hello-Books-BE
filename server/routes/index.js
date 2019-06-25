import express from 'express';
import auth from './auth';
import admin from './admin';
import user from './user';

const router = express.Router();

router.use('/', admin, user, auth);

export default router;
