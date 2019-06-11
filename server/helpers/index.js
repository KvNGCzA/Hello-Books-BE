import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import makeLowerCase from './customSanitizers';
import * as messages from './messages';
import enforceVerification from './enforceVerification';
<<<<<<< HEAD
import createUserRole from './createUserRole';
=======
import getPatrons from './getPatrons'
>>>>>>> 166575207-story(admin):findPatrons

const { signupMessage, createUserMessage } = messages;
export default {
  createToken,
  responseMessage,
  findUser,
  sendMail,
  makeLowerCase,
  signupMessage,
  enforceVerification,
<<<<<<< HEAD
  createUserMessage,
  createUserRole
=======
  getPatrons,
>>>>>>> 166575207-story(admin):findPatrons
};
