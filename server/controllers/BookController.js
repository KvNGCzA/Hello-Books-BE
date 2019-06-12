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
      title, description, isbn, price, yearPublished, stock, authorName
    } = request.body;
    try {
      const newAuthor = await Author.findOrCreate({ where: { fullname: authorName } });
      const existingBook = await Book.findOrCreate({
        where: { title },
        defaults: {
          description,
          isbn,
          price,
          yearPublished,
          stock
        }
      });
      await BookAuthor.create({ authorId: newAuthor[0].id, bookId: existingBook[0].id });
      const { dataValues } = existingBook[0];
      const message = `book successfully added${newAuthor[1] ? ' and author created' : ' and author exist'}`;
      return existingBook[1]
        ? responseMessage(response, 201, { status: 'success', message, book: { ...dataValues, author: authorName } })
        : responseMessage(response, 409, { message: 'book already exist' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default BookController;
