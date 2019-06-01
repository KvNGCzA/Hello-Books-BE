import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helpers from '../helpers/index';

dotenv.config();

const { responseMessage, findUser } = helpers;

export default (request, response, next) => {
  const token = request.headers.authorization || request.query.token;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        const message = (error.name === 'TokenExpiredError') ? 'token expired' : 'invalid token';
        responseMessage(response, 401, { message });
      } else {
        const user = findUser(decoded.id);
        if (!user) return responseMessage(response, 404, { message: 'user not found' });
        request.userData = user;
        next();
      }
    });
  } else {
    responseMessage(response, 401, { message: 'No token provided'});
  }
};
