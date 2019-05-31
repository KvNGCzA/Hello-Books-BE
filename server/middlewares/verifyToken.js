import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helpers from '../helpers/index';

dotenv.config();

const { responseMessage } = helpers;

export default (request, response, next) => {
  const token = request.headers.authorization || request.query.token;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        const message = (error.name === 'TokenExpiredError') ? 'Token expired' : 'Invalid token';
        responseMessage(response, 401, { message });
      } else {
        request.userData = decoded;
        next();
      }
    });
  } else {
    responseMessage(response, 401, { message: 'No token provided'});
  }
};
