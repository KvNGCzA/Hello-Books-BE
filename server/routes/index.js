import express from 'express';
import user from './user';
import admin from './admin';

const router = express.Router();

router.use('/', user);
router.use('/v1/admin', admin);

export default router;
