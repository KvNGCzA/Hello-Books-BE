import Sequelize from 'sequelize';
import models from '../database/models';

const { Op } = Sequelize;
const { Book, Author } = models;

const filter = (title, tag, author, keyword) => {
  const queryParams = {
    query: {
      '$Book.title$': { [Op.iLike]: `%${title}%` },
      '$Book.tag$': { [Op.iLike]: `${tag}` },
      '$Author.authorName$': { [Op.iLike]: `%${author}%` }
    },
    keyword: {
      [Op.or]: {
        '$Book.title$': { [Op.iLike]: `%${keyword}%` },
        '$Book.tag$': { [Op.iLike]: `${keyword}` },
        '$Author.authorName$': { [Op.iLike]: `%${keyword}%` }
      }
    }
  };
  if (!title) delete queryParams.query['$Book.title$'];
  if (!tag) delete queryParams.query['$Book.tag$'];
  if (!author) delete queryParams.query['$Author.authorName$'];
  const filterQuery = (keyword) ? { ...queryParams.keyword } : { ...queryParams.query };
  return {
    include: [{ model: Book }, { model: Author }],
    where: (keyword || title || tag || author) ? {
      ...filterQuery
    } : undefined
  };
};

const extractBooks = (result) => {
  const data = [];
  result.forEach((entry) => {
    const {
      id, title, description, isbn, price, yearPublished, tag, createdAt
    } = entry.Book;
    const { authorName } = entry.Author;
    const authorId = entry.Author.id;
    const newObj = {
      bookId: id,
      title,
      author: { id: authorId, authorName },
      description,
      isbn,
      price,
      yearPublished,
      tag,
      createdAt
    };
    data.push(newObj);
  });
  return data;
};

export default {
  filter,
  extractBooks
};
