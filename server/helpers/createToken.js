import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload, expiresIn) => {
  if (!expiresIn) return jwt.sign(payload, process.env.JWT_KEY);
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn });
};

export default createToken;
