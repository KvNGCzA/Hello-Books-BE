import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import makeLowerCase from './customSanitizers';
import * as messages from './messages';
import enforceVerification from './enforceVerification';
import setupNewUser from './setupNewUser';
import emptyBody from './emptyBody';
import getLendingHistory from './getLendingHistory';

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
  setupNewUser,
  resetpasswordMessage,
  emptyBody,
  getLendingHistory
};
