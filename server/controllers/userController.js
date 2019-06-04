import bcrypt from 'bcryptjs';
import models from '../database/models';
import helpers from '../helpers';

const { responseMessage, createToken, sendMail } = helpers;
const { User } = models;

/**
 * Create a new user 
 * @name createUser
 * @async
 * @param {Object} request
 * @param {Object} response
 * @returns {JSON Object}
 */

class UserController {
  static async createUser(request, response) {
    const { firstName, lastName, email, password, avatarUrl } = request.body
    try {
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return responseMessage(response, 409, { message: 'user already exist' });
      }
      const newUser = await User.create({ firstName, lastName, email, password: bcrypt.hashSync(password, 10), avatarUrl, verified: false })
      if (newUser) {
        const { id } = newUser.dataValues
        const token = createToken({ id }, '24h');
        return responseMessage(response, 201, { status: 'success', message: 'sign up successful', token });
      }
    } catch (error) {
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default UserController;
