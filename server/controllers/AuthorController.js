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

  /**
   * @description allows admin to update an author
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof AuthorControllers
   */
  static async updateAuthor(request, response) {
    const { params: { authorId }, body: { authorName } } = request;
    try {
      const authors = await Author.findAll();
      const existingAuthor = authors.find(author => author.id === +authorId);
      if (!existingAuthor) { return responseMessage(response, 404, { message: 'author not found' }); }
      const sameAuthor = authors
        .find(author => author.fullname === authorName && author.id === +authorId);
      if (sameAuthor) { return responseMessage(response, 409, { message: 'author name is the same' }); }
      const authorUpdate = await Author.update({ fullname: authorName }, {
        where: { id: authorId },
        returning: true,
        raw: true
      });
      return responseMessage(response, 200, { status: 'success', message: 'author updated successfully', author: authorUpdate[1][0] });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   * @description allows admin to delete an author
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof AuthorControllers
   */
  static async deleteAuthor(request, response) {
    const { params: { authorId } } = request;
    try {
      const existingAuthor = await Author.findOne({ where: { id: authorId } });
      if (!existingAuthor) { return responseMessage(response, 404, { message: 'author not found' }); }
      await Author.destroy({ where: { id: authorId } });
      return responseMessage(response, 200, { status: 'success', message: 'author successfully deleted' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }
}
