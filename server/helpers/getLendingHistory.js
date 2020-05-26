import models from '../database/models';
import responseMessage from './responseMessage';

const {
  LendingHistory, BookAuthor, Book, Author, User
} = models;

/**
 * Sets up a newly created user
 * @param {object} response - the response object
 * @param {object} filter - the userId
 * @param {object} limit - the user role id
 * @param {object} offset - user token
 * @return {object} - lending history
 */
const getLendingHistory = async (response, filter, limit, offset) => {
  try {
    const lendingHistory = await LendingHistory.findAll({
      limit,
      offset,
      where: filter,
      order: [['id', 'ASC']],
      attributes: { exclude: ['durationToken'] },
      include: [{
        model: Book,
        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
        include: [{
          model: BookAuthor,
          attributes: { exclude: ['createdAt', 'updatedAt', 'bookId', 'id'] },
          include: [{
            model: Author,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }]
        }]
      }, {
        model: User, attributes: { exclude: ['password', 'id'] }
      }],
    }); return lendingHistory;
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
export default getLendingHistory;
