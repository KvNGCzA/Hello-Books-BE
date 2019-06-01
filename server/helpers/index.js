import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import * as sanitizers from './customSanitizers';

const { capitaliseFirstLetter, makeLowerCase } = sanitizers;

export default {
  createToken,
  responseMessage,
  findUser,
  sendMail,
  capitaliseFirstLetter,
  makeLowerCase,
};
