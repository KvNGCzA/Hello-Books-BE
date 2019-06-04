import UserValidator from './UserValidator';
import checkForErrors from './checkForErrors';

/**
 * @class AuthorValidator
 * @classdesc Provides validation middleware for the create author route
 */
export default class AuthorValidator {
  /**
  * addAuthor validator
  * @returns {array} an array of Check API middleware
  * @memberof Validation
  */
  static addAuthorValidation() {
    return [
      UserValidator.checkName('fullname'),
      checkForErrors,
    ];
  }
}
