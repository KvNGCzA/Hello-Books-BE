import helpers from '../helpers';

const { responseMessage } = helpers;

export default (request, response, next) => {
  const { roleId } = request.body;
  if (roleId !== process.env.ADMIN_ROLE && roleId !== process.env.PATRON_ROLE) {
    return responseMessage(response, 404, { message: 'roleId does not exist' });
  }
  next();
};
