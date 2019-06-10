import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server/index';
import testData from './__mocks__';

chai.use(chaiHttp);
const { userData: { existingUser } } = testData;

const BASE_URL = '/api/v1/favourites';
const LOGIN_URL = '/api/v1/auth/login';

describe('FAVOURITE AUTHOR ROUTES', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(existingUser)
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  describe('Favourite Author', () => {
    it('should favourite an author for a user', (done) => {
      chai.request(app)
        .post(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 2 })
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
      chai.request(app)
        .post(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 100 })
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
      chai.request(app)
        .post(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 1 })
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
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 2 })
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
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 100 })
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
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 2 })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'message');
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.equal('author is not among your favourites');
          done();
        });
    });
  });

  describe('Fav Author Validations', () => {
    it('should return an error message if a user inputs alphabets as authorId', (done) => {
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: 'abc' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('body');
          expect(response.body.errors.body.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });

    it('should return an error message if a user inputs a negative number as authorId', (done) => {
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: '-1' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('body');
          expect(response.body.errors.body.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });

    it('should return an error message if a user inputs special characters as authorId', (done) => {
      chai.request(app)
        .delete(`${BASE_URL}?token=${userToken}`)
        .send({ authorId: '@#%' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.keys('status', 'errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors).to.be.an('object');
          expect(response.body.errors).to.have.haveOwnProperty('body');
          expect(response.body.errors.body.authorId).to.equal('authorId must be an integer, greater than 0 and must not contain leading zeros');
          done();
        });
    });
  });
});
