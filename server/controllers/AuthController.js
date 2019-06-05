import bcrypt from 'bcryptjs';
import models from '../database/models';
import helpers from '../helpers';

const { responseMessage, createToken, sendMail, signupMessage } = helpers;
const { User } = models;

/**
 * User controller class
 * @class
 */
export default class AuthController {
  /**
   * Create a new user
   * @name createUser
   * @param {object} request
   * @param {object} response
   * @returns {json} json
   * @memberof AuthController
   */
  static async createUser(request, response) {
    const {
      firstName, lastName, email, password, avatarUrl } = request.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return responseMessage(response, 409, { message: 'user already exist' });
      const newUser = await User.create({ firstName, lastName, email, password: bcrypt.hashSync(password, 10), avatarUrl });
      if (newUser) {
        const { id } = newUser.dataValues;
        const token = createToken({ id }, '24h');
        delete newUser.dataValues.password;
        const message = signupMessage(firstName, token);
        await sendMail(process.env.ADMIN_MAIL, email, message);
        return responseMessage(response, 201, { status: 'success', message: 'sign up successful', user: newUser.dataValues, token });
      }
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

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
      const { id, dataValues } = user;
      const token = createToken({ id });
      delete dataValues.password;
      return responseMessage(response, 200, {
        status: 'success',
        user: { ...dataValues },
        token
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * Method for handling verify route(GET api/v1/auth/verify)
   * @param {object} request - the request object
   * @param {object} response  - the response object
   * @return { object }  - the response object
   */
  static async verifyUser(request, response) {
    const { verified, email } = request.userData;
    try {
      if (verified) {
        return responseMessage(response, 409, { message: 'user has already been verified' });
      }
      await User.update({ verified: true }, { where: { email } });
      return responseMessage(response, 200, { status: 'success', message: 'verification successful' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
