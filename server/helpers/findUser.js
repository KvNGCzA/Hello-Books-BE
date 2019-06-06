import models from '../database/models';
import responseMessage from './responseMessage';

const { User, UserRole, Role } = models;

const findUser = async (param, response) => {
  try {
    const field = (/\D/g.test(param)) ? { email: param } : { id: param };
    const user = await User.findOne({ where: field, include: [{ model: UserRole, include:[{ model: Role }] }] });
    if (!user) {
      return responseMessage(response, 404, { message: 'user does not exit' });
    }
    return user;
  } catch (error) {
    /* istanbul ignore next-line */
    responseMessage(response, 500, { message: error.message });
  }
};

export default findUser;
