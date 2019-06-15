import Sequelize from 'sequelize';
import models from '../database/models';
import responseMessage from './responseMessage';

const { Book, Author } = models;

const { Op } = Sequelize;

const handleBookDisplay = (response, data, keyword) => {
  const pattern = new RegExp(`${keyword}`, 'gi');
  data = (keyword) ? data.filter(book => pattern.test(book.title)
    || pattern.test(book.author) || pattern.test(book.tag)) : data;
  const message = (data.length > 0) ? 'found books' : 'no book found based on keyword';
  const status = (data.length > 0) ? 'success' : 'failure';
  const code = (data.length > 0) ? 200 : 404;
  return responseMessage(response, code, { status, message, data });
};

const extractBooks = (result) => {
  const data = [];
  result.forEach((entry) => {
    const {
      id, title, description, isbn, price, yearPublished, tag
    } = entry.Book;
    const { fullname } = entry.Author;
    const newObj = {
      bookId: id, title, author: fullname, description, isbn, price, yearPublished, tag
    };
    data.push(newObj);
  });
  return data;
};

const anyQueryFilter = (bookTitle, authorName, bookTag) => ({
  include: [{
    model: Book,
    where: (bookTitle || bookTag)
      ? { [Op.or]: { title: { [Op.iLike]: `%${bookTitle}%` }, tag: { [Op.iLike]: `${bookTag}` } } } : undefined
  }, { model: Author, where: (authorName) ? { fullname: { [Op.iLike]: `%${authorName}%` } } : undefined }]
});

const noQueryFilter = () => ({
  include: [{ model: Book }, { model: Author }],
  order: [['bookId', 'ASC']]
});

export default {
  extractBooks,
  anyQueryFilter,
  noQueryFilter,
  handleBookDisplay
};
