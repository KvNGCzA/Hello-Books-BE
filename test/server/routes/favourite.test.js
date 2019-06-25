import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import testData from './__mocks__';

chai.use(chaiHttp);
const {
  userData: {
    newBook, existingUser, nonExistingBook, InvalidBook, InvalidBook1, InvalidBook2, patronLogin
  }
} = testData;
let patronToken;

const API_VERSION = '/api/v1';
const BASE_URL = `${API_VERSION}/favourite`;
const LOGIN_URL = `${API_VERSION}/auth/login`;

describe('FAVOURITE AUTHOR ROUTES', () => {
  let userToken;
  before((done) => {
    chai.request(server)
      .post(LOGIN_URL)
      .send(existingUser)
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  describe('Favourite Author', () => {
    it('should favourite an author for a user', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/author/2?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message', 'data');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('author successfully added to favourites');
          done();
        });
    });

    it('should return an error if the authorId provided does not match any author in the database', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/author/100?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('an author with the given id does not exists');
          done();
        });
    });

    it('should return an error if the user tries to favourite their already favourited author', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/author/1?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('author is already among your favourites');
          done();
        });
    });
  });

  describe('Unfavourite Author', () => {
    it('should favourite an author for a user', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/2?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('author successfully removed from favourites');
          done();
        });
    });

    it('should return an error if the authorId provided does not match any author in the database', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/100?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('an author with the given id does not exists');
          done();
        });
    });

    it('should return an error if user tries to unfavourite an author who isn\'t their favourite', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/2?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('author is not among your favourites');
          done();
        });
    });
  });

  describe('Favourite Author Validations', () => {
    it('should return an error message if a user inputs alphabets as authorId', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/abc?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('params');
          expect(response.body.errors.params.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });

    it('should return an error message if a user inputs a negative number as authorId', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/-1?token=${userToken}`)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('params');
          expect(response.body.errors.params.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });

    it('should return an error message if a user inputs special characters as authorId', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/author/11***`)
        .query({ token: userToken })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('params');
          expect(response.body.errors.params.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });
  });
});

describe('FAVOURITE BOOK ROUTES', () => {
  before((done) => {
    chai.request(server)
      .post(LOGIN_URL)
      .send(patronLogin)
      .end((error, response) => {
        patronToken = response.body.token;
        done();
      });
  });

  describe('Favourite Book Test', () => {
    it('should favourite book if the book is in the database', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${newBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('favourited successfully');
          expect(response.body.book).to.be.a('object');
          expect(response.body.book).to.have.property('authors');
          expect(response.body.book).to.have.property('description');
          expect(response.body.book.id).to.equal(newBook.id);
          done();
        });
    });

    it('should not favourite book if the book is already a favourite and also in the database', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${newBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('this book is already in your favourites');
          done();
        });
    });

    it('should not favourite book if the book is not the database', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${nonExistingBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('book not found');
          done();
        });
    });

    it('should not favourite book if the book id is of wrong format', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${InvalidBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.errors).to.be.a('object');
          expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
          done();
        });
    });

    it('should not favourite book if the book id is of wrong format', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${InvalidBook1.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.errors).to.be.a('object');
          expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
          done();
        });
    });

    it('should not favourite book if the book id is of wrong format', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/book/${InvalidBook2.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.errors).to.be.a('object');
          expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
          done();
        });
    });
  });

  describe('Unfavourite Book Test', () => {
    it('should unfavourite book if the book is already a favourite and also in the database', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/book/${newBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('unfavourited successfully');
          done();
        });
    });

    it('should not unfavourite book if the book is already removed from the favourites and also in the database', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/book/${newBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('this book is not in your favourites');
          done();
        });
    });

    it('should not favourite book if the book is not the database', (done) => {
      chai.request(server)
        .delete(`${BASE_URL}/book/${nonExistingBook.id}`)
        .query({ token: patronToken })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('book not found');
          done();
        });
    });
  });
});
