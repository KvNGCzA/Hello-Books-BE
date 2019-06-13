import models from '../database/models';
import helpers from '../helpers';

const {
  Author, FavouriteAuthor, FavoriteBook, Book, BookAuthor
} = models;

const { responseMessage } = helpers;

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
      const { authorId } = request.body;
      const { id } = request.userData;
      const author = await Author.findOne({ where: { id: authorId } });
      if (!author) return responseMessage(response, 404, { message: 'an author with the given id does not exists' });
      const alreadyFavourite = await FavouriteAuthor.findOne({ where: { userId: id, authorId } });
      if (alreadyFavourite) return responseMessage(response, 409, { message: 'author is already among your favourites' });
      const newFavourite = await FavouriteAuthor.create({ userId: id, authorId });
      if (newFavourite) {
        const { dataValues } = newFavourite;
        responseMessage(response, 201, { status: 'success', message: 'author successfully added to favourites', data: { ...dataValues } });
      }
    } catch (error) {
      /* istanbul ignore next */
      responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description check if book is in database
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {array} favoritebook, book and param object in an array
   * @memberof UserController
   */
  static async findBook(request, response) {
    const { id } = request.userData;
    const { bookId } = request.params;
    const favoritebook = await FavoriteBook.findOne({ where: { userId: id, bookId } });
    const book = await Book.findOne({
      where: { id: bookId },
      include: [{
        model: BookAuthor,
        include: [{
          model: Author
        }]
      }]
    });
    if (!book) return responseMessage(response, 404, { message: 'book not found' });
    return [favoritebook, { userId: id, bookId: parseInt(bookId, 10) }, book];
  }

  /**
   * @description user can favorite a book
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static async favoriteBook(request, response) {
    try {
      const [favoritebook, param, book] = await UserController.findBook(request, response);
      if (favoritebook) return responseMessage(response, 409, { message: 'this book is already in your favourites' });
      const { dataValues, BookAuthors } = book;
      const listOfAuthors = Array.from(BookAuthors).map(x => x.Author.fullname);
      delete dataValues.BookAuthors;
      await FavoriteBook.create(param);
      return responseMessage(response, 201, {
        status: 'success',
        message: 'favorited successfully',
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
      const { authorId } = request.body;
      const { id } = request.userData;
      const author = await Author.findOne({ where: { id: authorId } });
      if (!author) return responseMessage(response, 404, { message: 'an author with the given id does not exists' });
      const alreadyFavourite = await FavouriteAuthor.findOne({ where: { userId: id, authorId } });
      if (!alreadyFavourite) return responseMessage(response, 400, { message: 'author is not among your favourites' });
      const deleted = await FavouriteAuthor.destroy({ where: { userId: id, authorId } });
      if (deleted) responseMessage(response, 200, { status: 'success', message: 'author successfully removed from favourites' });
    } catch (error) {
      /* istanbul ignore next */
      responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description user can unfavorite a book
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static async unfavoriteBook(request, response) {
    try {
      const [favoritebook, param] = await UserController.findBook(request, response);
      if (!favoritebook) return responseMessage(response, 409, { message: 'this book is not in your favourites' });
      await FavoriteBook.destroy({ where: param });
      return responseMessage(response, 200, {
        status: 'success',
        message: 'unfavorited successfully',
      });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
