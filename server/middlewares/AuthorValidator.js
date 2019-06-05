import UserValidator from './UserValidator';
import checkForErrors from './checkForErrors';
import helpers from '../helpers';

const { makeLowerCase } = helpers;

/**
 * @class AuthorValidator
 * @classdesc Provides validation middleware for the create author route
 */
export default class AuthorValidator {
  /**
  * Authorname validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAuthorName() {
    return UserValidator.genericCheck('authorName')
      .trim()
      .isLength({ min: 2, max: 30 })
      .withMessage('authorName must be at least 2 characters, and maximum 30')
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage('invalid input for authorName')
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]{1}[A-Za-z]+(['-]?[A-Za-z]+)?)?([ -]{1}[A-Za-z]+(['-]?[A-Za-z]+)?)?$/, 'g')
      .withMessage('invalid input for authorName')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * addAuthor validator
  * @returns {array} an array of Check API middleware
  * @memberof Validation
  */
  static authorValidation() {
    return [
      AuthorValidator.checkAuthorName(),
      checkForErrors,
    ];
  }
}
