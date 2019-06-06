import sequelize from 'sequelize';
import { UserRole, Role, User } from '../database/models';
import responseMessage from './responseMessage';
/**
 * Creates a userRole data for the newly created user
 * @param {object} response - the response object
 * @param {number} userId - the userId
 * @param {string} roleName - the role name
 * @return {null} - no returned value
 */
const createUserRole = async (response, userId, roleName) => {
  try {
    const { Op } = sequelize;
    const role = await Role.findOne({ where: { roleName: { [Op.iLike]: roleName } } });
    if (!role) {
      await User.destroy({ where: { id: userId } });
      return responseMessage(response, 404, { message: 'role does not exit' });
    }
    const roleId = role.dataValues.id;
    await UserRole.create({ userId, roleId });
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
export default createUserRole;
