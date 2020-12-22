import models from '../database/models';
import helpers from '../helpers';

const { responseMessage, makeLowerCase, genericBookHelpers: { filter, extractBooks } } = helpers;
const { Book, Author, BookAuthor } = models;

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
      body: {
        title, description, isbn, price, yearPublished, tag, authorName
      }
    } = request;
    try {
      const fullname = makeLowerCase(authorName);
      const newAuthor = await Author.findOrCreate({ where: { authorName: fullname } });
      const existingBook = await Book.findOrCreate({
        where: { isbn },
        defaults: {
          description, title, price, yearPublished, tag
        }
      });
      await BookAuthor.create({ authorId: newAuthor[0].id, bookId: existingBook[0].id });
      const { dataValues } = existingBook[0];
      const message = `book successfully added${newAuthor[1] ? ' and author created' : ''}`;
      const author = { id: newAuthor[0].id, name: authorName };
      return existingBook[1]
        ? responseMessage(response, 201, { status: 'success', message, book: { ...dataValues, author } })
        : responseMessage(response, 409, { message: 'book already exist' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
* Fetch Books
* @name fetchBooks
* @param {Object} request
* @param {Object} response
* @returns {JSON} object
* @memberof BookController
*/
  static async fetchBooks(request, response) {
    const {
      title, author, tag, keyword, page = 1, limit = 10
    } = request.query;
    const standardQueries = title || author || tag;
    const queryFilter = filter(title, tag, author, keyword);
    try {
      if (keyword && standardQueries) return responseMessage(response, 400, { status: 'failure', message: 'keyword cannot be used with title, author or tag' });
      const countResults = await BookAuthor.findAndCountAll(queryFilter);
      const { count } = countResults;
      if (!count) return responseMessage(response, 404, { status: 'failure', message: 'no book found' });
      const pages = Math.ceil(count / limit);
      const offset = limit * (+page - 1);
      if (page > pages) return responseMessage(response, 400, { status: 'failure', message: 'page does not exist' });
      const results = await BookAuthor.findAll({ limit, offset, ...queryFilter });
      const books = extractBooks(results);
      return responseMessage(response, 200, {
        status: 'success', message: 'request successful', count, pages, current: +page, books
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
* Edit Books
* @name editBook
* @param {Object} request
* @param {Object} response
* @returns {JSON} object
* @memberof BookController
*/
  static async editBook(request, response) {
    const { id } = request.params;
    const {
      title, description, isbn, price, yearPublished, authorId
    } = request.body;
    let newAuthorId;
    try {
      const books = await Book.findAll();
      const availableBook = books.find(book => book.id === +id);
      if (!availableBook) return responseMessage(response, 400, { message: 'book does not exist' });
      if (isbn) {
        const availableIsbn = books.map(book => book.isbn).find(value => value === isbn);
        if (availableIsbn === isbn) return responseMessage(response, 409, { message: 'isbn already exist' });
      }
      // eslint-disable-next-line no-unused-vars
      const [numberOfAffectedRows, affectedRows] = await Book.update({
        title, description, isbn, price, yearPublished
      }, { where: { id: +id }, returning: true, plain: true });
      if (authorId) {
        const existingAuthorId = await Author.findOne({ where: { id: authorId } });
        if (!existingAuthorId) return responseMessage(response, 400, { message: 'author does not exist' });
        const newId = await BookAuthor.update({ authorId },
          { where: { bookId: +id }, returning: true, raw: true });
        newAuthorId = newId[1][0].authorId;
      }
      const data = title || description || isbn || price || yearPublished
        ? { ...affectedRows.dataValues, newAuthorId } : { newAuthorId };
      return responseMessage(response, 200, { status: 'success', message: 'book successfully updated', data });
    } catch (error) {
    /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
* Delete Books
* @name deleteBook
* @param {Object} request
* @param {Object} response
* @returns {JSON} object
* @memberof BookController
*/
  static async deleteBook(request, response) {
    const { id } = request.params;
    try {
      const books = await Book.findOne({ where: { id: +id } });
      if (!books) return responseMessage(response, 400, { message: 'book does not exist' });
      await Book.destroy({ where: { id: +id } });
      return responseMessage(response, 200, { status: 'success', message: 'book successfully deleted' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default BookController;
