import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';
import * as authorData from './__mocks__/authorData';

const BASE_URL = '/api/v1/admin';
const {
  invalidAuthor, invalidAuthor1, invalidAuthor2, blankAuthor,
  validAuthor, validAuthor1, validAuthor2, missingAuthorInput,
  wrongLengthAuthor1, wrongLengthAuthor2,
} = authorData;

chai.use(chaiHttp);

describe('ADMIN ROUTES', () => {
  const authorUrl = `${BASE_URL}/author`;
  describe('Author\'s Controller', () => {
    /**
       * Test the POST /author endpoint
       */
    it('should be able to add an author when all the parameters are given', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send({
          authorName: 'Barack Obama'
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to add an author that already exists', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send({
          authorName: 'barack obama'
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(409);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });
  });

  describe('Author Validations', () => {
    it('should pass the validation even with three names in authorName field', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(validAuthor)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('author successfully added');
          expect(response.body).to.have.property('data');
          done();
        });
    });

    it('should pass the validation even with a compound name in authorName field', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(validAuthor1)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('author successfully added');
          expect(response.body).to.have.property('data');
          done();
        });
    });

    it('should pass the validation even with names with apostrophes and compound names in authorName field', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(validAuthor2)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('author successfully added');
          expect(response.body).to.have.property('data');
          done();
        });
    });

    it('should return validation errors for required authorName field is not supplied in request', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(missingAuthorInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('authorName is missing');
          done();
        });
    });

    it('should return validation errors for blank authorName field in the request', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(blankAuthor)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('authorName cannot be blank');
          done();
        });
    });

    it('should return validation errors for invalid input authorName in the request - case1', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(invalidAuthor)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('invalid input for authorName');
          done();
        });
    });

    it('should return validation errors for invalid input authorName in the request - case2', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(invalidAuthor1)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('invalid input for authorName');
          done();
        });
    });

    it('should return validation errors for invalid input authorName in the request - case3', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(invalidAuthor2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('invalid input for authorName');
          done();
        });
    });

    it('should return validation error for authorName input that is not the required length', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(wrongLengthAuthor1)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('authorName must be at least 2 characters, and maximum 30');
          done();
        });
    });

    it('should return validation error for authorName input that is not the required length - case 2', (done) => {
      chai.request(app)
        .post(authorUrl)
        .send(wrongLengthAuthor2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.key('authorName');
          expect(response.body.errors.body.authorName).to.equal('authorName must be at least 2 characters, and maximum 30');
          done();
        });
    });
  });
});
