import models from '../database/models';
import helpers from '../helpers';

const { responseMessage } = helpers;
const { Book } = models;

/**
 * Add a new book
 * @name addBooks
 * @async
 * @param {Object} request
 * @param {Object} response
 * @returns {JSON Object}
 */

class AdminController {
  static async addBook(request, respond) {
    const {
      title,
      description,
      isbn,
      price,
      yearPublished,
      stock
    } = request.body;
    try{
        const requiredField = ["title", "description", "isbn", "price", "yearPublished", "stock"];
        const requiredError = requiredField.filter(key => data[key] === undefined).map(value => `${value} is required`);
        if (requiredError.length !== 3) {
            callbk(requiredError, null);
            return responseMessage(response, 400, { message: requiredError });
        }
        const newBook = await Book.create({title, description, isbn, price, yearPublished, stock });
        return responseMessage(response, 201, { message: 'successful Added'});
    }
    catch(error){
        return responseMessage(response, 500, { message: error.message });
    };
  };
};

export default AdminController;
