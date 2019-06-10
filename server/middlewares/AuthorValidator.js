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
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage('invalid input for authorName')
      .isLength({ min: 2, max: 30 })
      .withMessage('authorName must be at least 2 characters, and maximum 30')
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]{1}[A-Za-z]+(['-]?[A-Za-z]+)?)?([ -]{1}[A-Za-z]+(['-]?[A-Za-z]+)?)?$/, 'g')
      .withMessage('invalid input for authorName')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * AuthorId validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAuthorId() {
    return UserValidator.genericCheck('authorId')
      .trim()
      .isInt({ gt: 0, allow_leading_zeroes: false })
      .withMessage('authorId must be an integer, greater than 0 and must not contain leading zeros');
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

  /**
  * favAuthor validator
  * @returns {array} an array of a Check API middleware and error handler
  * @memberof Validation
  */
  static favAuthorValidation() {
    return [
      AuthorValidator.checkAuthorId(),
      checkForErrors,
    ];
  }
}
