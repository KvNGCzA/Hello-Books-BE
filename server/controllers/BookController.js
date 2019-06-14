import Sequelize from 'sequelize';
import models from '../database/models';
import helpers from '../helpers';

const { Op } = Sequelize;
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
      tag, title, description, isbn, price, yearPublished, stock, authorName
    } = request.body;
    try {
      const newAuthor = await Author.findOrCreate({ where: { fullname: authorName } });
      const author = await Author.findOne({ raw: true, where: { fullname: authorName }, attributes: ['id'] });
      const authorId = author.id;
      const existingBook = await Book.findOrCreate({
        where: { title },
        defaults: {
          tag,
          description,
          isbn,
          price,
          yearPublished,
          stock,
          authorId
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

  /**
 * filter a book
 * @name filterBook
 * @param {Object} request
 * @param {Object} response
 * @returns {JSON} object
 */
  static async filterBook(request, response) {
    let getAuthorId = 0;
    let filter = {};
    const { tag, author, title } = request.query;
    try {
      if (author) {
        getAuthorId = await Author.findOne({ raw: true, where: { fullname: author }, attributes: ['id'] });
      }
      const queryItem = tag || title || getAuthorId;
      if (queryItem) {
        filter = {
          where: {
            [Op.or]: {
              tag: { [Op.like]: `%${tag}%` },
              authorId: { [Op.eq]: getAuthorId.id },
              title: { [Op.like]: `%${title}%` }
            }
          }
        };
      }
      const results = await Book.findAll(filter);
      return responseMessage(response, 200, { status: 'success', message: 'search request succefully', results });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}

export default BookController;
