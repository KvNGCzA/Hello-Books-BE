import responseMessage from './responseMessage';
import models from '../database/models';
import * as messages from './messages';
import sendMail from './sendMail';

const { createUserMessage } = messages;
const { UserRole, Role, User } = models;

/**
 * Sets up a newly created user
 * @param {object} response - the response object
 * @param {object} userData - the userId
 * @param {string} roleId - the user role id
 * @param {string} token - user token
 * @return {function} - responseMessage()
 */
const setupNewUser = async (response, userData, roleId, token) => {
  try {
    const { id, email } = userData;
    const role = await Role.findOne({ where: { id: roleId } });
    const { roleName } = role;
    await UserRole.create({ userId: id, roleId });
    const message = createUserMessage(userData, roleName, token);
    await sendMail(process.env.ADMIN_MAIL, email, message);
    return responseMessage(response, 201, {
      status: 'success', message: `${roleName} successfully created`, user: { ...userData, role: roleName }
    });
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
export default setupNewUser;
