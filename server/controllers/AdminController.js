import models from '../database/models';
import helpers from '../helpers';

const {
  responseMessage, findUser, getPatrons,
} = helpers;
const { LendingHistory, User } = models;

/**
 * Admin controller class
 * @class AdminController
 */
class AdminController {
  /**
   * @name changeUserStatus
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

  /**
   * @name findPatrons
   * @param {object} request
   * @param {object} response
   * @returns {json} json
   * @memberof AdminController
   */
  static async findPatrons(request, response) {
    let filter = {};
    const { status } = request.query;
    try {
      if (status) filter = { where: { status } };
      const getAllLendingHistory = await LendingHistory.findAll(filter);
      const userId = getPatrons(getAllLendingHistory);
      const patron = await User.findAll({ raw: true, where: { id: userId } });
      if (!status) {
        if (patron.length === 0) return responseMessage(response, 404, { status: 'no data found', message: 'no patron found', data: {} });
        const newPatron = patron.filter(user => delete user.password);
        return responseMessage(response, 200, { status: 'success', message: 'patron found', data: newPatron });
      }
      return responseMessage(response, 200, { status: 'success', message: 'patron found', data: { ...getAllLendingHistory } });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
export default AdminController;
