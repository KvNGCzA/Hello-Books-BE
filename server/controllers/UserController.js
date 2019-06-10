import models from '../database/models';
import helpers from '../helpers';

const { Author, FavouriteAuthor } = models;
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
}
