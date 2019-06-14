import models from '../database/models';
import responseMessage from './responseMessage';

const {
  LendingHistory, BookAuthor, Book, Author
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
      include: [{
        model: Book,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: BookAuthor,
          attributes: { exclude: ['createdAt', 'updatedAt', 'bookId', 'id'] },
          include: [{
            model: Author,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }]
        }]
      }]
    });
    if (lendingHistory && !lendingHistory.length) {
      return responseMessage(response, 404, { message: 'no books borrowed yet' });
    }
    return lendingHistory;
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
export default getLendingHistory;
