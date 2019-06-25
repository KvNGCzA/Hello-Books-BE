import UserValidator from './UserValidator';
import checkForErrors from './checkForErrors';

/**
 * @class BorrowValidator
 * @classdesc Validates the borrowing a book route
 */
export default class BorrowValidator {
  /**
   * Borrow validator
   * @returns {array} an array of check API middleware
   * @memberof Validation
   */
  static BorrowValidation() {
    return [
      UserValidator.checkNumber('bookId'),
      checkForErrors
    ];
  }
}
