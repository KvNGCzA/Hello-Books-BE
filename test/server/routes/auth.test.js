import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server/index';
import testData from './__mocks__';

const { userData } = testData;
const { expect } = chai;
const {
  User,
  validInput,
  validInput1,
  validInput2,
  validInput3,
  missingInput,
  blankInput,
  invalidInput,
  invalidInput1,
  invalidInput2,
  invalidInput3,
  invalidInput4,
  invalidInput5,
  wrongLengthInput,
} = userData;

chai.use(chaiHttp);

const BASE_URL = '/api/v1/auth';
const BOOKS_BASE_URL = '/api/v1/books';
let token = '';

describe('AUTH', () => {
  // Test Signing up a user
  describe('User signup', () => {
    it('It Should create user with valid signup credentials', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('sign up successful');
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

  describe('User Validations', () => {
    it('should pass the validation even with two names in firstName or lastName field', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(validInput)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('sign up successful');
          done();
        });
    });

    it('should pass the validation even with compound names in firstName or lastName field', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(validInput1)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('sign up successful');
          done();
        });
    });

    it('should pass the validation even with two compound names in the firstName or lastName field', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(validInput2)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('sign up successful');
          done();
        });
    });

    it('should pass the validation even with names that contain apostrophes in the firstName and lastName field', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(validInput3)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('sign up successful');
          done();
        });
    });


    it('should return validation errors for required input fields not supplied in request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(missingInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
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
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('firstName cannot be blank');
          expect(response.body.errors.body.lastName).to.equal('lastName cannot be blank');
          expect(response.body.errors.body.email).to.equal('email cannot be blank');
          expect(response.body.errors.body.password).to.equal('password cannot be blank');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl cannot be blank');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case1', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case2', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput1)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case3', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput2)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case4', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput3)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case5', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput4)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request - case6', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput5)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('invalid input for firstName');
          expect(response.body.errors.body.lastName).to.equal('invalid input for lastName');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.password).to.equal('password cannot contain whitespace');
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
          expect(response.body.status).to.equal('failure');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'password');
          expect(response.body.errors.body.firstName).to.equal('firstName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.lastName).to.equal('lastName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.password).to.equal('password must be at least 6 characters');
          done();
        });
    });
  });

  describe('User logs in', () => {
    it('It should login user with valid login credentials', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/login`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          /* eslint-disable-next-line */
          token = response.body.token;
          done();
        });
    });
    it('returns a status 200 if user supplies the valid email and password', (done) => {
      const body = {
        email: 'jamiefoxx@gmail.com',
        password: 'jamiefoxx'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'user', 'token');
          expect(response.body.status).to.be.equal('success');
          expect(response.body.user).to.include.all.keys('id', 'firstName', 'lastName', 'email');
          expect(response.body.user.id).to.be.a('Number');
          expect(response.body.user.firstName).to.be.a('String');
          expect(response.body.user.lastName).to.be.a('String');
          expect(response.body.user.email).to.be.a('String');
          done();
        });
    });
    it('should return validation errors for required input fields not supplied in request', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(missingInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('email', 'password');
          expect(response.body.errors.body.email).to.equal('email is missing');
          expect(response.body.errors.body.password).to.equal('password is missing');
          done();
        });
    });
    it('should return validation errors for blank input fields in the request', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(blankInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('email', 'password');
          expect(response.body.errors.body.email).to.equal('email cannot be blank');
          expect(response.body.errors.body.password).to.equal('password cannot be blank');
          done();
        });
    });
    it('should return validation errors for input fields that are not the required length', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(wrongLengthInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('password');
          expect(response.body.errors.body.password).to.equal('password must be at least 6 characters');
          done();
        });
    });
    it('should return a status 401 if user is not in the database', (done) => {
      const body = {
        email: 'jamiefoxx@gmail.com',
        password: 'password',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response).to.be.a('object');
          expect(response.body).to.have.all.keys('status', 'message');
          expect(response.body.message).to.be.a('String');
          done();
        });
    });
    it('should return a status 401 if user is inactive', (done) => {
      const body = {
        email: 'inactiveuser@email.com',
        password: 'password',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response).to.be.a('object');
          expect(response.body).to.have.all.keys('status', 'message');
          expect(response.body.message).to.be.a('String');
          done();
        });
    });
    it('should return a status 401 if user inputs wrong password', (done) => {
      const body = {
        email: 'todaytest@email.com',
        password: 'password1',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response).to.be.a('object');
          expect(response.body).to.have.all.keys('status', 'message');
          expect(response.body.message).to.be.a('String');
          done();
        });
    });

    it('It Should verify user email address', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/verify?token=${token}`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('verification successful');
          done();
        });
    });

    it('It Should fail to verify user email address', (done) => {
      chai.request(server)
        .get(`${BASE_URL}/verify?token=${token}`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('user has already been verified');
          done();
        });
    });

    it('It should  reset password with a valid mail successfully', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/passwordreset`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('you will recieve a link in your mail shortly to proceed');
          done();
        });
    });

    it('It should fail to reset password with an invalid mail', (done) => {
      const body = {
        email: 'nonexistingmail',
      };
      chai.request(server)
        .post(`${BASE_URL}/passwordreset`)
        .send(body)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.body).to.have.keys('email');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          done();
        });
    });

    it('It should reset password with a correct token successfully', (done) => {
      const body = {
        password: 'adekorede',
      };
      chai.request(server)
        .patch(`${BASE_URL}/passwordresetVerify?token=${token}`)
        .send(body)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('password changed successfully');
          done();
        });
    });
  });
  describe('Fetch Books router', () => {
    it('It should get book with query string page and limit', (done) => {
      chai.request(server)
        .get(`${BOOKS_BASE_URL}?page=1&limit=10`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('request successful');
          done();
        });
    });
    it('It should get book without query string page and limit', (done) => {
      chai.request(server)
        .get(`${BOOKS_BASE_URL}`)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('request successful');
          done();
        });
    });
    it('It should get response:"page does not exist" if current page is greater than pages', (done) => {
      chai.request(server)
        .get(`${BOOKS_BASE_URL}?page=10000000&limit=10`)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('page does not exist');
          done();
        });
    });
    it('It should get book wrong query string page and limit', (done) => {
      chai.request(server)
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
});
