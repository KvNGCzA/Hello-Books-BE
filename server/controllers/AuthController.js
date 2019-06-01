import bcrypt from 'bcryptjs';
import models from '../database/models';
import helpers from '../helpers';


const { responseMessage, createToken } = helpers;
const { User } = models;
/**
/**
 * Auth controller class
 * @class
 */
class AuthController {
  /**
   * Method for handling signin route(POST api/v1/auth/signin)
   * @param {object} request - the request object
   * @param {object} response  - the response object
   * @return { object }  - the response object
   */
  static async login(request, response) {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({ where: { email } });
      let verifyPassword;
      if (user) { verifyPassword = bcrypt.compareSync(password, user.password); }
      if (!user || !verifyPassword) {
        return responseMessage(response, 401, { message: 'username or password is incorrect' });
      }
      const { id } = user;
      const token = createToken({ id });
      delete user.password;
      return responseMessage(response, 200, {
        status: 'success',
        user,
        token
      });
    } catch (error) {
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default AuthController;
