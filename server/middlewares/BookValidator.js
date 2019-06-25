import UserValidator from './UserValidator';
import checkForErrors from './checkForErrors';
import AuthorValidator from './AuthorValidator';

const year = new Date().getFullYear();

/**
 * @class BookValidator
 * @classdesc Validates the book addition route
 */
export default class BookValidator {
  /**
   * Title validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkTitle() {
    return UserValidator.genericCheck('title')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('title must be at least 2 characters, and maximum 50')
      .not()
      .matches(/^[0-9]+([,.][0-9]+)?$/, 'g')
      .withMessage('title must contain alphabets')
      .not()
      .matches(/^[^a-zA-Z0-9]+$/, 'g')
      .withMessage('title must contain alphabets');
  }

  /**
   * Description validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkDescription() {
    return UserValidator.genericCheck('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('description must be at least 10 characters')
      .not()
      .matches(/^[0-9]+([,.][0-9]+)?$/, 'g')
      .withMessage('description must contain alphabets')
      .not()
      .matches(/^[^a-zA-Z0-9]+$/, 'g')
      .withMessage('description must contain alphabets');
  }

  /**
   * Isbn validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkIsbn() {
    return UserValidator.genericCheck('isbn')
      .trim()
      .isISBN()
      .withMessage('isbn is not valid')
      .isInt({ min: 1000000000, max: 9999999999999 })
      .withMessage('input only numbers of a valid isbn');
  }

  /**
   * Price validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkPrice() {
    return UserValidator.genericCheck('price')
      .trim()
      .isCurrency({
        symbol: 'N',
        allow_negatives: false,
      })
      .withMessage('price should be a valid currency amount');
  }

  /**
   * Year published validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkYearPublished() {
    return UserValidator.genericCheck('yearPublished')
      .trim()
      .isInt({ min: 1455, max: year })
      .withMessage('year published must be a valid year');
  }

  /**
   * Generic Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static authorName() {
    return AuthorValidator.checkAuthorName();
  }

  /**
 * Generic Default Number validator
 * @param {integer} item
 * @returns {function} call to a check API middleware
 * @memberof Validation
 */
  static checkNumberForDefault(item) {
    return UserValidator.genericCheck(item)
      .optional()
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
  }

  /**
   * Book validator
   * @returns {array} an array of check API middleware
   * @memberof Validation
   */
  static BookValidation() {
    return [
      BookValidator.checkTitle(),
      BookValidator.checkDescription(),
      BookValidator.checkIsbn(),
      BookValidator.checkPrice(),
      BookValidator.checkYearPublished(),
      BookValidator.authorName(),
      checkForErrors,
    ];
  }

  /**
   * Fetch Book Validation
   * @returns {array} an array of check API middleware
   * @memberof Validation
   */
  static FetchBookValidation() {
    return [
      BookValidator.checkNumberForDefault('page'),
      BookValidator.checkNumberForDefault('limit'),
      checkForErrors,
    ];
  }

  /**
   * Favourite Book validator
   * @returns {array} an array of check API middleware
   * @memberof Validation
   */
  static FavouriteBookValidation() {
    return [
      UserValidator.checkNumber('bookId'),
      checkForErrors,
    ];
  }
}
