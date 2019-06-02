import models from '../database/models';
import responseMessage from './responseMessage';

const { User } = models;

const findUser = async (param, response) => {
  try {
    const field = (/\D/g.test(param)) ? { email: param } : { id: param };
    const user = await User.findOne({ where: field });
    return user;
  } catch (error) {
    responseMessage(response, 500, { message: error.message });
  }
};

export default findUser;
