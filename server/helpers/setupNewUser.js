import responseMessage from './responseMessage';
import createUserRole from './createUserRole';
import * as messages from './messages';
import sendMail from './sendMail';

const { createUserMessage } = messages;
/**
 * Sets up a newly created user
 * @param {object} response - the response object
 * @param {object} userData - the userId
 * @param {string} role - the user role
 * @param {string} token - user token
 * @return {function} - responseMessage()
 */
const setupNewUser = async (response, userData, role, token) => {
  try {
    const { id, email } = userData;
    await createUserRole(response, id, role);
    const message = createUserMessage(userData, role, token);
    await sendMail(process.env.ADMIN_MAIL, email, message);
    return responseMessage(response, 201, {
      status: 'success', message: `${role} successfully created`, user: { ...userData }
    });
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
export default setupNewUser;
