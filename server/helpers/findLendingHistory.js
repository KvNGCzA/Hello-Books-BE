import jwt from 'jsonwebtoken';
import models from '../database/models';
import responseMessage from './responseMessage';

const { LendingHistory } = models;

const findLendingHistory = async (id, bookId, response) => {
  try {
    let bookDuration = '';
    const borrowedBook = await LendingHistory.findOne({ where: { userId: id, bookId, type: 'borrowed' }, order: [['createdAt', 'DESC']], limit: 1 });
    if (borrowedBook) {
      const { durationToken } = borrowedBook.dataValues;
      jwt.verify(durationToken, process.env.JWT_KEY, async (error) => {
        if (error) {
          bookDuration = 'book token expired';
        }
      });
    }
    return [borrowedBook, bookDuration];
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};

export default findLendingHistory;
