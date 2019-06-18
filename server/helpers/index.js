import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import makeLowerCase from './customSanitizers';
import * as messages from './messages';
import enforceVerification from './enforceVerification';
import createUserRole from './createUserRole';
import setupNewUser from './setupNewUser';
import emptyBody from './emptyBody';

const { signupMessage, createUserMessage, resetpasswordMessage } = messages;
export default {
  createToken,
  responseMessage,
  findUser,
  sendMail,
  makeLowerCase,
  signupMessage,
  enforceVerification,
  createUserMessage,
  createUserRole,
  setupNewUser,
  resetpasswordMessage,
  emptyBody,
};
