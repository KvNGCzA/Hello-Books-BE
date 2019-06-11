import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';
import testData from './__mocks__';
import * as userData from './__mocks__/userData';

const { authorData, userData: { admin, notVerified, notAdmin } } = testData;

const API_VERSION = '/api/v1';
const BASE_URL = `${API_VERSION}/admin`;
const loginUrl = `${API_VERSION}/auth/login`;
const {
  invalidAuthor, invalidAuthor1, invalidAuthor2, blankAuthor,
  validAuthor, validAuthor1, validAuthor2, missingAuthorInput,
  wrongLengthAuthor1, wrongLengthAuthor2,
} = authorData;
const {
  missingInput,
  blankInput,
} = userData;

chai.use(chaiHttp);

describe('ADMIN ROUTES', () => {
  let adminToken;
  let authorUrlForAdmin;
  let authorUrlForUnverified;
  let authorUrlForNonAdmin;
  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(admin)
      .end((error, response) => {
        adminToken = response.body.token;
        authorUrlForAdmin = `${BASE_URL}/author?token=${adminToken}`;
        done();
      });
  });

  let unverifiedUserToken;
  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(notVerified)
      .end((error, response) => {
        unverifiedUserToken = response.body.token;
        authorUrlForUnverified = `${BASE_URL}/author?token=${unverifiedUserToken}`;
        done();
      });
  });

  let nonAdminToken;
  before((done) => {
    chai.request(app)
      .post(loginUrl)
      .send(notAdmin)
      .end((error, response) => {
        nonAdminToken = response.body.token;
        authorUrlForNonAdmin = `${BASE_URL}/author?token=${nonAdminToken}`;
        done();
      });
  });

  describe('Author\'s Controller', () => {
    /**
       * Test the POST /author endpoint
       */
    it('should be able to add an author when all the parameters are given', (done) => {
      chai.request(app)
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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

    // Test for enforceVerification helper in the verifyToken middleware
    it('should reject an unverified user\'s access', (done) => {
      chai.request(app)
        .post(authorUrlForUnverified)
        .send({ authorName: 'Caramen Zach' })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(403);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('please verify your account to perform this action');
          done();
        });
    });

    it('should reject a non-admin user\'s access', (done) => {
      chai.request(app)
        .post(authorUrlForNonAdmin)
        .send({ authorName: 'Dirk Kuyt' })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(403);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('unauthorized user');
          done();
        });
    });
  });

  describe('Author Validations', () => {
    it('should pass the validation even with three names in authorName field', (done) => {
      chai.request(app)
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
        .post(authorUrlForAdmin)
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
describe('Admin creates new user', () => {
  let usertoken;
  before((done) => {
    const body = {
      email: 'hellobooks@email.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        usertoken = response.body.token;
        done();
      });
  });
  it('returns a status 201 if user supplies valid credentials', (done) => {
    const body = {
      firstName: 'Sday',
      lastName: 'Olseh',
      email: 'sundayolseh@email.com',
      role: 'patron'
    };
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(201);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'user');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.user).to.include.all.keys('id', 'firstName', 'lastName', 'email');
        expect(response.body.user.id).to.be.a('Number');
        expect(response.body.user.firstName).to.be.a('String');
        expect(response.body.user.lastName).to.be.a('String');
        expect(response.body.user.email).to.be.a('String');
        done();
      });
  });
  it('returns a status 201 if user supplies valid credentials', (done) => {
    const body = {
      firstName: 'New',
      lastName: 'Admin',
      email: 'newadmin@email.com',
      role: 'admin'
    };
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(201);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'user');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.user).to.include.all.keys('id', 'firstName', 'lastName', 'email');
        expect(response.body.user.id).to.be.a('Number');
        expect(response.body.user.firstName).to.be.a('String');
        expect(response.body.user.lastName).to.be.a('String');
        expect(response.body.user.email).to.be.a('String');
        done();
      });
  });
  it('returns a status 404 if role does not exit', (done) => {
    const body = {
      firstName: 'Sunday',
      lastName: 'Oliseh',
      email: 'sundayoliseh@email.com',
      role: 'notfound'
    };
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('should return validation errors for required input fields not supplied in request', (done) => {
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(missingInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'role');
        expect(response.body.errors.body.firstName).to.equal('firstName is missing');
        expect(response.body.errors.body.lastName).to.equal('lastName is missing');
        expect(response.body.errors.body.email).to.equal('email is missing');
        expect(response.body.errors.body.role).to.equal('role is missing');
        done();
      });
  });
  it('should return validation errors for blank input fields in the request', (done) => {
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(blankInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'role');
        expect(response.body.errors.body.firstName).to.equal('firstName cannot be blank');
        expect(response.body.errors.body.lastName).to.equal('lastName cannot be blank');
        expect(response.body.errors.body.email).to.equal('email cannot be blank');
        expect(response.body.errors.body.role).to.equal('role cannot be blank');
        done();
      });
  });
  it('should return a status 401 if user does not have a valid token', (done) => {
    const body = {
      firstName: 'Peter',
      lastName: 'Taye',
      email: 'petertaye@email.com',
      role: 'user'
    };
    chai.request(app)
      .post('/api/v1/admin/user')
      .send(body)
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
      email: 'notsuperadmin@email.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        const { token } = response.body;
        const body2 = {
          firstName: 'Peter',
          lastName: 'Taye',
          email: 'petertaye@email.com',
          role: 'user'
        };
        chai.request(app)
          .post('/api/v1/admin/user')
          .send(body2)
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
describe('Admin can deactivate or activate a user', () => {
  let usertoken;
  before((done) => {
    const body = {
      email: 'hellobooks@email.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        usertoken = response.body.token;
        done();
      });
  });
  it('returns a status 200 if user is successfully deactivated if active', (done) => {
    const body = {
      status: 'inactive'
    };
    chai.request(app)
      .patch('/api/v1/admin/user/6')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'message');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.message).to.be.equal('user successfully deactivated');
        done();
      });
  });
  it('returns a status 400 if user is already active', (done) => {
    const body = {
      status: 'active'
    };
    chai.request(app)
      .patch('/api/v1/admin/user/2')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('returns a status 200 if user is successfully activated if inactive', (done) => {
    const body = {
      status: 'active'
    };
    chai.request(app)
      .patch('/api/v1/admin/user/7')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        expect(response.body).to.include.all.keys('status', 'message');
        expect(response.body.status).to.be.equal('success');
        expect(response.body.message).to.be.equal('user successfully activated');
        done();
      });
  });
  it('returns a status 400 if user is already inactive', (done) => {
    const body = {
      status: 'inactive'
    };
    chai.request(app)
      .patch('/api/v1/admin/user/8')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('returns a status 404 if user does not exit', (done) => {
    const body = {
      status: 'inactive'
    };
    chai.request(app)
      .patch('/api/v1/admin/user/116718')
      .send(body)
      .set('Authorization', usertoken)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response).to.be.a('object');
        expect(response.body).to.have.all.keys('status', 'message');
        expect(response.body.message).to.be.a('String');
        done();
      });
  });
  it('should return validation errors for required input fields not supplied in request', (done) => {
    chai.request(app)
      .patch('/api/v1/admin/user/4345')
      .send(missingInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body.status).to.equal('status is missing');
        done();
      });
  });
  it('should return validation errors for blank input fields in the request', (done) => {
    chai.request(app)
      .patch('/api/v1/admin/user/5678')
      .send(blankInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body).to.have.keys('status');
        expect(response.body.errors.body.status).to.equal('status cannot be blank');
        done();
      });
  });
  it('should return a status 401 if user does not have a valid token', (done) => {
    chai.request(app)
      .patch('/api/v1/admin/user/8908')
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
      email: 'notsuperadmin@email.com',
      password: 'password',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(body)
      .end((err, response) => {
        const { token } = response.body;
        chai.request(app)
          .patch('/api/v1/admin/user/8908')
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
