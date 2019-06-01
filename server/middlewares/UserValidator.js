import expressValidator from 'express-validator/check';
import helpers from '../helpers';
import checkForErrors from './checkForErrors';

const { check } = expressValidator;
const { capitaliseFirstLetter, makeLowerCase } = helpers;

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class UserValidator {
  /**
  * Generic validator to be used by all others
  * @param {string} field
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static genericCheck(field) {
    return check(`${field}`)
      .exists().withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`);
  }

  /**
  * Email validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkEmail() {
    return UserValidator.genericCheck('email')
      .isEmail()
      .withMessage('email is not valid')
      .blacklist(' ')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Firstname and lastname validator
  * @param {string} name
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkName(name) {
    return UserValidator.genericCheck(`${name}`)
      .isAlpha()
      .withMessage(`${name} can only contain alphabets`)
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .blacklist(' ')
      .customSanitizer(value => capitaliseFirstLetter(value));
  }

  /**
  * Password validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkPassword() {
    return UserValidator.genericCheck('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('password must be at least 6 characters')
      .blacklist(' ');
  }

  /**
  * AvatarUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAvatarUrl() {
    return check('avatarUrl')
      .optional()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('avatarUrl cannot be blank')
      .isURL()
      .withMessage('avatarUrl must be a valid URL string')
      .blacklist(' ');
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static signUpValidation() {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkName('firstName'),
      UserValidator.checkName('lastName'),
      UserValidator.checkPassword(),
      UserValidator.checkAvatarUrl(),
      checkForErrors,
    ];
  }

  /**
  * Login validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static loginValidation() {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkPassword(),
      checkForErrors,
    ];
  }
}
