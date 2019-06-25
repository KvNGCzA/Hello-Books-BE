import bcrypt from 'bcryptjs';
import models from '../database/models';
import helpers from '../helpers';

const {
  responseMessage, createToken, sendMail, signupMessage, setupNewUser, resetpasswordMessage,
  findUser, notifications
} = helpers;
const { User, UserRole, Role } = models;
const defaultPassword = process.env.PASSWORD || 'setpassword';

/**
 * Auth controller class
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
      firstName, lastName, email, password, roleId, avatarUrl
    } = request.body;
    let newUserFromAdmin;
    try {
      if (!password) newUserFromAdmin = true;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return responseMessage(response, 409, { message: 'user already exist' });
      const userPassword = bcrypt.hashSync(password || defaultPassword, 10);
      const newUser = await User.create({
        firstName, lastName, email, password: userPassword, avatarUrl
      });
      const { id, dataValues } = newUser;
      const token = createToken({ id }, '24h');
      delete dataValues.password;
      if (newUserFromAdmin) return setupNewUser(response, dataValues, roleId, token);
      await UserRole.create({ userId: id });
      const message = signupMessage(firstName, token);
      await sendMail(process.env.ADMIN_MAIL, email, message);
      return responseMessage(response, 201, {
        status: 'success', message: 'sign up successful', user: { ...dataValues }
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
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
      if (dataValues.status === 'inactive') {
        return responseMessage(response, 401, {
          message: 'Your account is deactivated, please contact the admin for more information'
        });
      }
      const role = await UserRole.findOne({ where: { userId: id }, include: [Role] });
      if (role.Role.roleName === 'admin') notifications.overdueBook();
      const token = createToken({ id });
      delete dataValues.password;
      return responseMessage(response, 200, { status: 'success', user: { ...dataValues }, token });
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

  /**
 *
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 * @memberof AuthController
 */
  static async resetpasswordEmail(request, response) {
    const { email } = request.body;
    try {
      const user = await findUser(email, response);
      const { id, firstName } = user;
      const token = createToken({ id }, '2h');
      const message = resetpasswordMessage(firstName, token);
      await sendMail(process.env.ADMIN_MAIL, email, message);
      return responseMessage(response, 200, { status: 'success', message: 'you will receive a link in your mail shortly to proceed' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
 *
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 * @memberof AuthController
 */
  static async resetPassword(request, response) {
    try {
      const { id } = request.userData;
      const password = bcrypt.hashSync(request.body.password, 10);
      await User.update({ password }, { where: { id } });
      return responseMessage(response, 200, { status: 'success', message: 'password changed successfully' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
