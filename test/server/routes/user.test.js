import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';
import testData from './__mocks__';

const API_VERSION = '/api/v1';
const borrowUrl = `${API_VERSION}/borrow`;
const BOOKS_BASE_URL = '/api/v1/books';
const extendUrl = `${borrowUrl}/extend`;
const loginUrl = `${API_VERSION}/auth/login`;
const UPDATE_URL = '/api/v1/user/update';

const {
  userData: {
    notAdmin, notAdmin2, patronLogin, patronSignup, patronProfile, brokePatron
  },
  bookData: {
    newBookToBorrow, newBookToBorrow2, nonExistingBookToBorrow, InvalidBookToBorrow,
    InvalidBookToBorrow1, InvalidBookToBorrow2, InvalidBookToBorrow3
  }
} = testData;

chai.use(chaiHttp);

let patronToken;
let patronToken3;
let patronToken4;

describe('PATRON ROUTES', () => {
  let patronToken2;
  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(notAdmin)
      .end((error, response) => {
        patronToken = response.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(notAdmin2)
      .end((error, response) => {
        patronToken2 = response.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(brokePatron)
      .end((error, response) => {
        patronToken3 = response.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(patronLogin)
      .end((error, response) => {
        patronToken4 = response.body.token;
        done();
      });
  });

  describe('User\'s Controller', () => {
    /**
       * Test the POST /borrow endpoint
       */
    it('should be able to borrow a book when all the required parameters are given', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(newBookToBorrow)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should be able to borrow another book when all the required parameters are given', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(newBookToBorrow2)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should be able to borrow a book when the book is already borrowed and the session has expired', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(newBookToBorrow2)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to borrow a book when the book is already borrowed and the session has not expired', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(newBookToBorrow)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(409);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('book already borrowed');
          done();
        });
    });

    it('should not be able to borrow a book when the book does not exist', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(nonExistingBookToBorrow)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(404);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when no token provided', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .send(nonExistingBookToBorrow)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(401);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when user has insufficient funds', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken2)
        .send(newBookToBorrow)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(402);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when the book id is invalid - case 1', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(InvalidBookToBorrow)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when the book id is invalid - case 2', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(InvalidBookToBorrow1)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when the book id is invalid - case 3', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(InvalidBookToBorrow2)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });

    it('should not be able to borrow a book when the book id is invalid - case 4', (done) => {
      chai.request(app)
        .post(borrowUrl)
        .set('Authorization', patronToken)
        .send(InvalidBookToBorrow3)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal('failure');
          done();
        });
    });
  });
  describe('Extend Book Borrowing Period Test', () => {
    before((done) => {
      chai.request(app)
        .post(`${borrowUrl}`)
        .query({ token: patronToken3 })
        .send({ bookId: 3 })
        .end(() => {
          done();
        });
    });

    it('should extend the duration of a borrowed book', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken })
        .send(newBookToBorrow)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'message', 'data');
          expect(response.body.status).to.equal('success');
          expect(response.body.data).to.be.an('object');
          expect(response.body.data).to.include.all.keys('type', 'duration');
          done();
        });
    });
    it('should not extend the duration of a borrowed book if user hasnt borrowed the book', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken4 })
        .send(nonExistingBookToBorrow)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('this book is not among user\'s actively borrowed book');
          done();
        });
    });
    it('should not extend the duration of a borrowed book if duration token is malformed', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken3 })
        .send(newBookToBorrow2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('borrowing period expired.');
          done();
        });
    });
    it('should not extend the duration of a borrowed book if borrowing period has expired', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken3 })
        .send({ bookId: 3 })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('borrowing period expired.');
          done();
        });
    });
  });
  describe('Extend Book Borrowing Period Test', () => {
    before((done) => {
      chai.request(app)
        .patch(`${UPDATE_URL}`)
        .query({ token: patronToken4 })
        .send({ paymentStatus: false })
        .end(() => {
          done();
        });
    });
    after((done) => {
      chai.request(app)
        .patch(`${UPDATE_URL}`)
        .query({ token: patronToken4 })
        .send({ paymentStatus: true })
        .end(() => {
          done();
        });
    });
    it('should not extend the duration of a borrowed book if user\'s payment status is false', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken4 })
        .send({ bookId: 1 })
        .end((error, response) => {
          expect(response).to.have.status(402);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('insufficient funds to extend borrowing period');
          done();
        });
    });
  });
  describe('Extend Book Borrowing Period Validation Test', () => {
    it('should not extend the duration of a borrowed book if no data is given', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken4 })
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.include.all.keys('body');
          expect(response.body.errors.body).to.include.all.keys('bookId');
          done();
        });
    });
    it('should not extend the duration of a borrowed book if the body contains invalid parameters', (done) => {
      chai.request(app)
        .post(`${extendUrl}`)
        .query({ token: patronToken4 })
        .send(InvalidBookToBorrow)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.include.all.keys('body');
          expect(response.body.errors.body).to.include.all.keys('bookId');
          done();
        });
    });
  });
});

describe('Update user profile', () => {
  it('should update a user profile', (done) => {
    chai.request(app)
      .patch(`${UPDATE_URL}`)
      .query({ token: patronToken })
      .send(patronProfile)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('profile update successful');
        done();
      });
  });

  it('should not update a user profile if the email already exist in the database', (done) => {
    chai.request(app)
      .patch(`${UPDATE_URL}`)
      .query({ token: patronToken })
      .send(patronSignup)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('email already exist');
        done();
      });
  });

  it('should not update a user profile if password is a parameter', (done) => {
    chai.request(app)
      .patch(`${UPDATE_URL}`)
      .query({ token: patronToken })
      .send(patronLogin)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        done();
      });
  });

  it('should not update a user profile if request body is empty', (done) => {
    chai.request(app)
      .patch(`${UPDATE_URL}`)
      .query({ token: patronToken })
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        done();
      });
  });
  it('should not update a user profile if token is empty', (done) => {
    chai.request(app)
      .patch(`${UPDATE_URL}`)
      .query({})
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        done();
      });
  });
});

let bookTitle;
describe('Fetch Books router', () => {
  it('It should get book with query string page and limit', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}?page=1&limit=10`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('request successful');
        done();
      });
  });
  it('It should get book without query string page and limit', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .end((error, response) => {
        bookTitle = response.body.books[0].title.slice(0, 7);
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('request successful');
        done();
      });
  });
  it('It should get response:"page does not exist" if current page is greater than pages', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}?page=10000000&limit=10`)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('page does not exist');
        done();
      });
  });
  it('It should get book wrong query string page and limit', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}?page=ed&limit=lcd`)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.query.page).to.be.equal('page value must be at least 1 and an integer');
        expect(response.body.errors.query.limit).to.be.equal('limit value must be at least 1 and an integer');
        done();
      });
  });
});

describe('Search Books', () => {
  it('should search a book based on the book title', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ title: bookTitle })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('request successful');
        expect(response.body.books).to.be.an('array');
        expect(response.body.books.length).to.not.equal(0);
        done();
      });
  });

  it('should search a book based on the tag', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ tag: 'Epic' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('request successful');
        expect(response.body.books).to.be.an('array');
        expect(response.body.books.length).to.not.equal(0);
        done();
      });
  });

  it('should search a book based on the author name', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ author: 'doe' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('request successful');
        expect(response.body.books).to.be.an('array');
        expect(response.body.books.length).to.not.equal(0);
        done();
      });
  });

  it('should search books based on a keyword', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ keyword: 'doe' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('request successful');
        expect(response.body.books).to.be.an('array');
        expect(response.body.books.length).to.not.equal(0);
        done();
      });
  });

  it('should return a failure status if there are no related books based on the keyword', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ keyword: 'blahblahblahx5' })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('no book found');
        done();
      });
  });

  it('should return a failure status if there are no related books based any other parameters', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ author: 'blahblahblahx5' })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('no book found');
        done();
      });
  });

  it('should return a failure status if the keyword query param is used with other params except page or limit', (done) => {
    chai.request(app)
      .get(`${BOOKS_BASE_URL}`)
      .query({ author: 'blahblahblahx5', keyword: 'john' })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('keyword cannot be used with title, author or tag');
        done();
      });
  });
});
