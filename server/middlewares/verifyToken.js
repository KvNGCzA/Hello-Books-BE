import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helpers from '../helpers';

dotenv.config();

const { responseMessage, findUser, enforceVerification } = helpers;

export default (request, response, next) => {
  const token = request.headers.authorization || request.query.token;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      if (error) {
        const message = (error.name === 'TokenExpiredError') ? 'token expired' : 'invalid token';
        responseMessage(response, 401, { message });
      } else {
        const user = await findUser(decoded.id);
        if (!user) return responseMessage(response, 404, { message: 'user not found' });
        return enforceVerification(request, response, next, user);
      }
    });
  } else {
    responseMessage(response, 401, { message: 'no token provided' });
  }
};
