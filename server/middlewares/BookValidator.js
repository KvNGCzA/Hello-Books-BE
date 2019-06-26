import UserValidator from './UserValidator';
import checkForErrors from './checkForErrors';
import helpers from '../helpers';
import AuthorValidator from './AuthorValidator';

const year = new Date().getFullYear();
const { emptyBody } = helpers;


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
   * Tag validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkTag() {
    return UserValidator.genericCheck('tag')
      .trim()
      .isAlpha()
      .withMessage('tag can only be alphabets');
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
  * Generic check Number validator
  * @param { integer } item
  * @returns { function} call to a check API middleware
  * @memberof Validation
  */
  static checkNumber(item) {
    return UserValidator.genericCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
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
 * Generic Optional Number validator
 * @param {integer} item
 * @returns {function} call to a check API middleware
 * @memberof Validation
 */
  static optionalNumber(item) {
    return this.checkNumber(item).optional();
  }

  /**
   * Optional Title validator
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static optionalTitle() {
    return this.checkTitle().optional();
  }

  /**
    * Optional Description validator
    * @returns {function} call to a check API middleware
    * @memberof Validation
    */
  static optionalDescription() {
    return this.checkDescription().optional();
  }

  /**
  * Optional Isbn validator
  * @returns {function} call to a check API middleware
  * @memberof Validation
  */
  static optionalIsbn() {
    return this.checkIsbn().optional();
  }

  /**
  * Optional Price validator
  * @returns {function} call to a check API middleware
  * @memberof Validation
  */
  static optionalPrice() {
    return this.checkPrice().optional();
  }

  /**
  * Optional Year Published validator
  * @returns {function} call to a check API middleware
  * @memberof Validation
  */
  static optionalYearPublished() {
    return this.checkYearPublished().optional();
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
      BookValidator.checkTag(),
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
      BookValidator.optionalNumber('page'),
      BookValidator.optionalNumber('limit'),
      BookValidator.checkTitle().optional(),
      AuthorValidator.checkAuthorName().optional(),
      BookValidator.checkTag().optional(),
      UserValidator.genericCheck('keyword').optional(),
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

  /**
 * Edit validator
 * @returns {array} an array of check API middleware
 * @memberof Validation
 */
  static EditValidation() {
    return [
      BookValidator.checkNumber('id'),
      BookValidator.optionalTitle(),
      BookValidator.optionalDescription(),
      BookValidator.optionalIsbn(),
      BookValidator.optionalPrice(),
      BookValidator.optionalYearPublished(),
      BookValidator.optionalNumber('authorId'),
      checkForErrors,
      emptyBody,
    ];
  }

  /**
 * Delete validator
 * @returns {array} an array of check API middleware
 * @memberof Validation
 */
  static DeleteValidation() {
    return [
      BookValidator.checkNumber('id'),
      checkForErrors,
    ];
  }
}
