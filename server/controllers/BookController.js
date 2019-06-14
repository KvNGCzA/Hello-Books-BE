import models from '../database/models';
import helpers from '../helpers';

const { responseMessage, getLendingHistory } = helpers;
const {
  Book, Author, BookAuthor, LendingHistory
} = models;

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
        title, description, isbn, price, yearPublished, authorName
      }
    } = request;
    try {
      const newAuthor = await Author.findOrCreate({ where: { fullname: authorName } });
      const existingBook = await Book.findOrCreate({
        where: { isbn },
        defaults: {
          description, title, price, yearPublished
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
    let { page, limit } = request.query;
    page = page || 1;
    limit = limit || 10;
    try {
      const countResults = await Book.findAndCountAll();
      const { count } = countResults;
      const pages = Math.ceil(count / limit);
      const offset = limit * (+page - 1);
      if (page > pages) return responseMessage(response, 400, { status: 'failure', message: 'page does not exist' });
      const results = await Book.findAll({
        limit,
        offset,
        include: [{
          model: BookAuthor, include: [{ model: Author, attributes: ['fullname'] }], attributes: ['authorId'], order: [['id']]
        }]
      });
      return responseMessage(response, 200, {
        status: 'success', message: 'request successful', count, pages, current: +page, results
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
 * Add a new book
 * @name addBook
 * @param {Object} request
 * @param {Object} response
 * @returns {JSON} object
 */
  static async getBorrowingStats(request, response) {
    try {
      const { limit, page } = request.query;
      const { count } = await LendingHistory.findAndCountAll();
      const totalPages = Math.ceil(count / (limit || 10));
      if ((page || 1) > totalPages) {
        return responseMessage(response, 400, { status: 'failure', message: 'total possible pages exceeded' });
      }
      const offset = (limit || 10) * ((page || 1) - 1);
      const user = JSON.parse(JSON.stringify(request.userData));
      const { id } = user;
      const { roleName } = user.UserRoles[0].Role;
      let filter = { userId: id };
      if (roleName === 'admin' || roleName === 'superadmin') filter = {};
      const lendingHistory = await getLendingHistory(response, filter, limit, offset);
      if (lendingHistory && lendingHistory.length) {
        const dataValues = JSON.parse(JSON.stringify(lendingHistory));
        dataValues.forEach((data) => {
          data.Book.Author = data.Book.BookAuthors[0].Author;
          delete data.Book.BookAuthors;
        });
        return responseMessage(response, 200, { status: 'success', dataValues });
      }
    } catch (error) {
      /* istanbul ignore next */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default BookController;
