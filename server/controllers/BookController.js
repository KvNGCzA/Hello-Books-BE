import models from '../database/models';
import helpers from '../helpers';

const { responseMessage } = helpers;
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
        title, description, isbn, price, yearPublished, authorName
      }
    } = request;
    try {
      const newAuthor = await Author.findOrCreate({ where: { fullname: authorName } });
      const existingBook = await Book.findOrCreate({
        where: { isbn },
        defaults: {
          description,
          title,
          price,
          yearPublished
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
}

export default BookController;
