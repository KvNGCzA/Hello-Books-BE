import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server/index';
import * as inputData from './testData';

const { expect } = chai;
const {
  User,
  missingInput,
  blankInput,
  invalidInput,
  wrongLengthInput,
} = inputData;

chai.use(chaiHttp);

const BASE_URL = '/api/v1/auth';

describe('AUTH', () => {
// Test Signing up a user
  describe('User signup', () => {
    it('It Should create user with right signup credentials', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('sign up successful');
          expect(response.body).to.have.property('token');
          done();
        });
    });
    it('should not register a new user with an already existing email', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('user already exist');
          done();
        });
    });
  });

  describe('Validations', () => {
    it('should return validation errors for required input fields not supplied in request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(missingInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password');
          expect(response.body.errors.body.firstName).to.equal('firstName is missing');
          expect(response.body.errors.body.lastName).to.equal('lastName is missing');
          expect(response.body.errors.body.email).to.equal('email is missing');
          expect(response.body.errors.body.password).to.equal('password is missing');
          done();
        });
    });

    it('should return validation errors for blank input fields in the request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(blankInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('firstName cannot be blank');
          expect(response.body.errors.body.lastName).to.equal('lastName cannot be blank');
          expect(response.body.errors.body.email).to.equal('email cannot be blank');
          expect(response.body.errors.body.password).to.equal('password cannot be blank');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl cannot be blank');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('firstName can only contain alphabets');
          expect(response.body.errors.body.lastName).to.equal('lastName can only contain alphabets');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for input fields that are not the required length', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(wrongLengthInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'password');
          expect(response.body.errors.body.firstName).to.equal('firstName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.lastName).to.equal('lastName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.password).to.equal('password must be at least 6 characters');
          done();
        });
    });
  });
});

