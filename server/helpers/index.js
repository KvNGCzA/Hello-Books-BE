import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import makeLowerCase from './customSanitizers';
import * as messages from './messages';

const { signupMessage, siginMessage } = messages;
export default {
  createToken,
  responseMessage,
  findUser,
  sendMail,
  makeLowerCase,
  signupMessage,
  siginMessage,
};
