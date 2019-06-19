import expressValidator from 'express-validator/check';
import helpers from '../helpers';
import checkForErrors from './checkForErrors';

const { check } = expressValidator;
const { makeLowerCase, emptyBody } = helpers;

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
* input validator to be used by all others
* @param {string} field
* @returns {function} call to a Check API middleware
* @memberof Validation
*/
  static inputCheck(field) {
    return check(`${field}`)
      .optional()
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true });
  }

  /**
  * Email validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkEmail() {
    return UserValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Profile Email validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkProfileEmail() {
    return UserValidator.genericCheck('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('email is not valid')
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
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Profile Firstname and lastname validator
  * @param {string} name
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkProfileName(name) {
    return UserValidator.genericCheck(`${name}`)
      .optional()
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .customSanitizer(value => makeLowerCase(value));
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
      .not()
      .matches(/\s/, 'g')
      .withMessage('password cannot contain whitespace');
  }

  /**
  * Profile Password validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkProfilePassword() {
    return UserValidator.inputCheck('password')
      .withMessage('password cannot be updated here')
      .isLength({ min: 0, max: 0 })
      .withMessage('password cannot be updated here');
  }

  /**
  * AvatarUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAvatarUrl() {
    return UserValidator.inputCheck('avatarUrl')
      .withMessage('avatarUrl cannot be blank')
      .isURL()
      .withMessage('avatarUrl must be a valid URL string');
  }

  /**
   * Role validator
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static checkRole() {
    return UserValidator.genericCheck('roleId')
      .trim()
      .isInt({ allow_leading_zeroes: false })
      .withMessage('roleId value must be an integer');
  }

  /**
   * Role validator
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static checkStatus() {
    return UserValidator.genericCheck('status')
      .custom((value) => {
        if (value !== 'active' && value !== 'inactive') {
          return Promise.reject(new Error('status can either be active or inactive'));
        }
        return Promise.resolve(true);
      });
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
  * Update profile  validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static profileValidation() {
    return [
      UserValidator.checkProfileEmail(),
      UserValidator.checkProfileName('firstName'),
      UserValidator.checkProfileName('lastName'),
      UserValidator.checkAvatarUrl(),
      UserValidator.checkProfilePassword(),
      checkForErrors,
      emptyBody,
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

  /**
   * CreateUser validation
   * @returns {array} an array of Check API middlewares
   * @memberof Validation
   */
  static createUserValidation() {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkName('firstName'),
      UserValidator.checkName('lastName'),
      UserValidator.checkRole(),
      checkForErrors,
    ];
  }

  /**
   *
   *
   * @static
   * @returns {array} of Check API middlewares
   * @memberof UserValidator
   */
  static EmailValidation() {
    return [
      UserValidator.checkEmail(),
      checkForErrors,
    ];
  }

  /**
   * DeleteUser validation
   * @returns {array} an array of Check API middlewares
   * @memberof Validation
   */
  static changeStatusValidation() {
    return [
      UserValidator.checkStatus(),
      checkForErrors
    ];
  }

  /**
   *
   *
   * @static
   * @returns {array} an array of check API middleware
   * @memberof UserValidator
   */
  static PasswordValidation() {
    return [
      UserValidator.checkPassword(),
      checkForErrors,
    ];
  }
}
