import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import testData from './__mocks__';

const {
  userData: {
    newBook, nonExistingBook, InvalidBook, InvalidBook1, InvalidBook2,
    patronLogin,
    patronSignup, patronProfile
  }
} = testData;

const API_VERSION = '/api/v1';
const BASE_URL = `${API_VERSION}/favorites/book/`;
const loginUrl = `${API_VERSION}/auth/login`;
const UPDATE_URL = '/api/v1/user/update';

let patronToken;

chai.use(chaiHttp);

before((done) => {
  chai.request(server)
    .post(loginUrl)
    .send(patronLogin)
    .end((error, response) => {
      patronToken = response.body.token;
      done();
    });
});

describe('Favorite Book Test', () => {
  it('should favorite book if the book is in the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('favorited successfully');
        expect(response.body.book).to.be.a('object');
        expect(response.body.book).to.have.property('authors');
        expect(response.body.book).to.have.property('description');
        expect(response.body.book.id).to.equal(newBook.id);
        done();
      });
  });

  it('should not favorite book if the book is already a favorite and also in the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('this book is already in your favourites');
        done();
      });
  });

  it('should not favorite book if the book is not the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${nonExistingBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('book not found');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook1.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook2.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });
});


describe('Unfavorite Book Test', () => {
  it('should unfavorite book if the book is already a favorite and also in the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('unfavorited successfully');
        done();
      });
  });

  it('should not unfavorite book if the book is already removed from the favorites and also in the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('this book is not in your favourites');
        done();
      });
  });

  it('should not favorite book if the book is not the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${nonExistingBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('book not found');
        done();
      });
  });
});
describe('Update user profile', () => {
  it('should update a user profile', (done) => {
    chai.request(server)
      .patch(`${UPDATE_URL}`)
      .query({ token: patronToken })
      .send(patronProfile)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('update successful');
        done();
      });
  });
  it('should not update a user profile if the email already exist in the database', (done) => {
    chai.request(server)
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
    chai.request(server)
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
    chai.request(server)
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
    chai.request(server)
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
describe('User gets lending history', () => {
  let userToken;
  before((done) => {
    const body = {
      email: 'kylian@gmail.com',
      password: 'kylianMbappe',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        userToken = response.body.token;
        done();
      });
  });
  it('returns a status 200 if the request is successful', (done) => {
    chai.request(server)
      .get('/api/v1/user/lendinghistory')
      .set('Authorization', userToken)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'dataValues');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.dataValues).to.be.an('array');
        expect(response.body.dataValues[0]).to.include.all.keys('userId', 'bookId', 'Book', 'charge');
        expect(response.body.dataValues[0]).to.be.an('object');
        done();
      });
  });
  it('returns a status 200 if the request is successful', (done) => {
    chai.request(server)
      .get('/api/v1/user/lendinghistory?page=1&limit=1')
      .set('Authorization', userToken)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'dataValues');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.dataValues).to.be.an('array');
        expect(response.body.dataValues[0]).to.include.all.keys('userId', 'bookId', 'Book', 'charge');
        expect(response.body.dataValues[0]).to.be.an('object');
        done();
      });
  });
  it('returns a status 400 if the pages is greater than the total possible pages', (done) => {
    chai.request(server)
      .get('/api/v1/user/lendinghistory?page=10&limit=100')
      .set('Authorization', userToken)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('returns a status 400 if the pages or limit is less than one or not an integer', (done) => {
    chai.request(server)
      .get('/api/v1/user/lendinghistory?page=fadf&limit=-1')
      .set('Authorization', userToken)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'errors');
        expect(response.body.errors).to.be.a('object');
        done();
      });
  });
  it('returns a status 404 if no lending history exits', (done) => {
    const body = {
      email: 'nolending@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        const {
          token
        } = response.body;
        chai.request(server)
          .get('/api/v1/user/lendinghistory')
          .set('Authorization', token)
          .end((err1, response1) => {
            expect(response1).to.have.status(404);
            expect(response1).to.be.a('object');
            expect(response1.body).to.have.all.keys('status', 'message');
            expect(response1.body.message).to.be.a('String');
            expect(response1.body.message).to.equal('no books borrowed yet');
            done();
          });
      });
  });
  it('should return a status 401 if user does not have a valid token', (done) => {
    chai.request(server)
      .get('/api/v1/user/lendinghistory')
      .set('Authorization', 'indfafadavldfafidtoddakddfendfadf')
      .end((err, response) => {
        expect(response).to.have.status(401);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('should return a status 403 if user does have the permission to access the route', (done) => {
    const body = {
      email: 'hellobooks@email.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        const {
          token
        } = response.body;
        chai.request(server)
          .get('/api/v1/user/lendinghistory')
          .set('Authorization', token)
          .end((err, response1) => {
            expect(response1).to.have.status(403);
            expect(response1).to.be.a('object');
            expect(response1.body).to.have.all.keys('status', 'message');
            expect(response1.body.message).to.be.a('String');
            done();
          });
      });
  });
});
