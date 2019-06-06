import bcrypt from 'bcryptjs';
import models from '../database/models';
import helpers from '../helpers';

const {
  responseMessage, findUser
} = helpers;
const { User } = models;

/**
 * Admin controller class
 * @class
 */
class AdminController {
  /**
   * Create a new user
   * @name createUser
   * @param {object} request
   * @param {object} response
   * @returns {json} json
   * @memberof AdminController
   */
  static async changeUserStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;
    try {
      const user = await findUser(id, response);
      const { dataValues } = user;
      if (status === dataValues.status) {
        return responseMessage(response, 400, { message: `user is already ${status}` });
      }
      return responseMessage(response, 200, {
        status: 'success', message: `user successfully ${status === 'active' ? 'activated' : 'deactivated'}`
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
export default AdminController;
