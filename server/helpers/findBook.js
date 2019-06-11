import models from '../database/models';
import responseMessage from './responseMessage';

const { Book, Author, BookAuthor } = models;

const findBook = async (id, response) => {
  try {
    const existingBook = await Book.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{
        model: BookAuthor, attributes: ['authorId'], include: [{ model: Author, attributes: ['authorName'] }]
      }]
    });
    if (!existingBook) return responseMessage(response, 404, { message: 'book not found' });
    return existingBook;
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};

export default findBook;
