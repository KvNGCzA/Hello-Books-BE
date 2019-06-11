import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import makeLowerCase from './customSanitizers';
import getPatrons from './getPatrons';
import * as messages from './messages';
import enforceVerification from './enforceVerification';
import createUserRole from './createUserRole';

const { signupMessage, createUserMessage } = messages;
export default {
  createToken,
  responseMessage,
  findUser,
  sendMail,
  makeLowerCase,
  signupMessage,
  getPatrons,
  enforceVerification,
  createUserMessage,
  createUserRole,
};
