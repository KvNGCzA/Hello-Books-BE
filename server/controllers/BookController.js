import models from '../database/models';
import helpers from '../helpers';

const { responseMessage, genericBookHelpers } = helpers;
const { Book, Author, BookAuthor } = models;
const {
  extractBooks, anyQueryFilter, noQueryFilter, handleBookDisplay
} = genericBookHelpers;


/**
 * @class BookController
 */
class BookController {
  /**
   * Add a new book
   * @name addBook
   * @param {Object} request
   * @param {Object} response
   * @returns {JSON} object
   */
  static async addBook(request, response) {
    const {
      title, description, isbn, price, yearPublished, tag, authorName
    } = request.body;
    try {
      const newAuthor = await Author.findOrCreate({ where: { fullname: authorName } });
      const existingBook = await Book.findOrCreate({
        where: { isbn },
        defaults: {
          description,
          title,
          price,
          yearPublished,
          tag
        }
      });
      await BookAuthor.create({ authorId: newAuthor[0].id, bookId: existingBook[0].id });
      const { dataValues } = existingBook[0];
      const message = `book successfully added${newAuthor[1] ? ' and author created' : ''}`;
      return existingBook[1]
        ? responseMessage(response, 201, { status: 'success', message, book: { ...dataValues, author: newAuthor[0].id } })
        : responseMessage(response, 409, { message: 'book already exist' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * get books
   * @name getBooks
   * @param {Object} request
   * @param {Object} response
   * @returns {JSON} object
   */
  static async getBooks(request, response) {
    // destructure the different params from the query
    const {
      bookTitle, authorName, bookTag, keyword
    } = request.query;
    try {
      // check if bookTitle, authorName or bookTag exists
      if (bookTitle || authorName || bookTag) {
        const result = await BookAuthor.findAll(anyQueryFilter(bookTitle, authorName, bookTag));
        if (result.length > 0) {
          const books = extractBooks(result);
          return handleBookDisplay(response, books);
        }
        return responseMessage(response, 404, { message: 'no related book found' });
      }
      // get all books or based on a keyword if the other params are not supplied
      const result = await BookAuthor.findAll(noQueryFilter());
      if (result.length > 0) {
        const books = extractBooks(result);
        return handleBookDisplay(response, books, keyword);
      }
      /* istanbul ignore next-line */
      return responseMessage(response, 404, { message: 'no book found' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default BookController;
