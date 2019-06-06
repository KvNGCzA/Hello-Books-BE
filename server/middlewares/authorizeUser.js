import helpers from '../helpers';

const { responseMessage } = helpers;

export default roleArray => async (request, response, next) => {
  try {
    const { UserRoles } = request.userData;
    if (!UserRoles[0]) return responseMessage(response, 404, { message: 'role not found' });
    const userRoles = UserRoles.map(x => x.Role.roleName);
    if (!roleArray.some(roleName => userRoles.includes(roleName.toLowerCase()))) return responseMessage(response, 403, { message: 'unauthorized user' });
    next();
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
