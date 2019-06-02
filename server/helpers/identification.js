import models from '../database/models';
import responseMessage from './responseMessage';

const { User } = models;

const getUser = async (param, response) => {
  try {
    const field = (/\D/g.test(param)) ? { email: param } : { id: param };
    const user = await User.findOne({ where: field });
    return user;
  } catch (error) {
    responseMessage(response, 500, { message: 'Error occured' });
  }
};

export default getUser;
