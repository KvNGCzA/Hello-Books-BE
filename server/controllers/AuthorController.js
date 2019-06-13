import models from '../database/models';
import helpers from '../helpers';

const { Author } = models;
const { responseMessage, makeLowerCase } = helpers;

/**
 * @class AuthorController
 */
export default class AuthorController {
  /**
   * @description allows admin add an author
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof AuthorControllers
   */
  static async addAuthor(request, response) {
    try {
      const { authorName } = request.body;
      const fullname = makeLowerCase(authorName);
      const existingAuthor = await Author.findOne({ where: { fullname } });
      if (existingAuthor) return responseMessage(response, 409, { message: 'author already exists' });
      const newAuthor = await Author.create({ fullname });
      const { dataValues } = newAuthor;
      return responseMessage(response, 201, { status: 'success', message: 'author successfully added', data: { ...dataValues } });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
