import models from '../database/models';
import helpers from '../helpers';

const { SERVICE_CHARGE } = process.env;

const {
  Author,
  FavouriteAuthor,
  FavouriteBook,
  LendingHistory,
  User
} = models;
const {
  responseMessage, findBook, findLendingHistory
} = helpers;


/**
 * @class UserController
 * @classdesc User actions
 */
export default class UserController {
  /**
   * @description allows a user to favourite an author
   * @param {object} request request object
   * @param {object} response response object
   * @returns {json} the json response been return by the server
   * @memberof UserController
   */
  static async favouriteAuthor(request, response) {
    try {
      const { authorId } = request.params;
      const { id } = request.userData;
      const author = await Author.findOne({ where: { id: authorId } });
      if (!author) return responseMessage(response, 404, { message: 'an author with the given id does not exists' });
      const alreadyFavourite = await FavouriteAuthor.findOne({ where: { userId: id, authorId } });
      if (alreadyFavourite) return responseMessage(response, 409, { message: 'author is already among your favourites' });
      const newFavourite = await FavouriteAuthor.create({ userId: id, authorId });
      const { dataValues } = newFavourite;
      responseMessage(response, 201, { status: 'success', message: 'author successfully added to favourites', data: { ...dataValues } });
    } catch (error) {
      /* istanbul ignore next */
      responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description user can favourite a book
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static async favouriteBook(request, response) {
    try {
      const { id } = request.userData;
      const { bookId } = request.params;
      const book = await findBook(bookId, response);
      const existingFavourite = await FavouriteBook.findOne({ where: { userId: id, bookId } });
      if (existingFavourite) return responseMessage(response, 409, { message: 'this book is already in your favourites' });
      const { dataValues, BookAuthors } = book;
      const listOfAuthors = Array.from(BookAuthors).map(x => x.Author.authorName);
      delete dataValues.BookAuthors;
      await FavouriteBook.create({ userId: id, bookId });
      return responseMessage(response, 201, {
        status: 'success',
        message: 'favourited successfully',
        book: { ...dataValues, authors: listOfAuthors.join(', ') }
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description allows a user to unfavourite an author
   * @param {object} request request object
   * @param {object} response response object
   * @returns {json} the json response been return by the server
   * @memberof UserController
   */
  static async unfavouriteAuthor(request, response) {
    try {
      const { authorId } = request.params;
      const { id } = request.userData;
      const author = await Author.findOne({ where: { id: authorId } });
      if (!author) return responseMessage(response, 404, { message: 'an author with the given id does not exists' });
      const alreadyFavourite = await FavouriteAuthor.findOne({ where: { userId: id, authorId } });
      if (!alreadyFavourite) return responseMessage(response, 404, { message: 'author is not among your favourites' });
      await FavouriteAuthor.destroy({ where: { userId: id, authorId } });
      responseMessage(response, 200, { status: 'success', message: 'author successfully removed from favourites' });
    } catch (error) {
      /* istanbul ignore next */
      responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description user can unfavourite a book
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static async unfavouriteBook(request, response) {
    try {
      const { id } = request.userData;
      const { bookId } = request.params;
      await findBook(bookId, response);
      const existingFavourite = await FavouriteBook.findOne({ where: { userId: id, bookId } });
      if (!existingFavourite) return responseMessage(response, 404, { message: 'this book is not in your favourites' });
      await FavouriteBook.destroy({ where: { userId: id, bookId } });
      return responseMessage(response, 200, {
        status: 'success',
        message: 'unfavourited successfully',
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
  * @description allows a user to edit their profile
  * @param {object} request request object
  * @param {object} response response object
  * @returns {json} the json response been return by the server
  * @memberof UserController
  */
  static async editProfile(request, response) {
    const { body, userData } = request;
    const { id } = userData;
    const { email } = body;
    try {
      if (email) {
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
          return responseMessage(response, 409, { message: 'email already exist' });
        }
      }
      const updatedUser = await User.update({
        ...body
      }, {
        where: { id },
        returning: true,
        raw: true
      });
      delete updatedUser[1][0].password;
      return responseMessage(response, 200, { status: 'success', message: 'profile update successful', user: updatedUser[1][0] });
    } catch (error) {
      /* istanbul ignore next */
      responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description allows users to borrow a book
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static async borrowBook(request, response) {
    try {
      const { id, paymentStatus } = request.userData;
      const { bookId } = request.body;
      if (!paymentStatus) return responseMessage(response, 402, { message: 'insufficient funds to borrow book' });
      const existingBook = await findBook(bookId, response);
      const { dataValues, BookAuthors: [BookAuthor] } = existingBook;
      const { authorName } = BookAuthor.dataValues.Author;
      delete dataValues.BookAuthors;
      const [borrowedBook, bookDuration] = await findLendingHistory(id, bookId, response);
      if (borrowedBook && bookDuration === '') return responseMessage(response, 409, { message: 'book already borrowed' });
      const borrowingBook = await LendingHistory.create({
        bookId, userId: id, charge: SERVICE_CHARGE
      });
      const { charge, duration } = borrowingBook;
      return responseMessage(response, 201, {
        status: 'success',
        message: 'book successfully borrowed',
        data: {
          ...dataValues, author: authorName, charge, duration
        }
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
