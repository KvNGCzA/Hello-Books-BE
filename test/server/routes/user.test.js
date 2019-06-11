import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';
import testData from './__mocks__';

const API_VERSION = '/api/v1';
const borrowUrl = `${API_VERSION}/borrow`;
const loginUrl = `${API_VERSION}/auth/login`;
const UPDATE_URL = '/api/v1/user/update';

const {
  userData: {
    notAdmin, notAdmin2, patronLogin, patronSignup, patronProfile
  },
  bookData: {
    newBookToBorrow, newBookToBorrow2, nonExistingBookToBorrow, InvalidBookToBorrow,
    InvalidBookToBorrow1, InvalidBookToBorrow2, InvalidBookToBorrow3
  }
} = testData;

chai.use(chaiHttp);

let patronToken;

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
