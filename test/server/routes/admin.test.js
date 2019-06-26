import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';
import testData from './__mocks__';
import * as userData from './__mocks__/userData';

const {
  authorData, bookData: {
    badBook, badBook2, book, book2, bookSameIsbn, nonExistingAuthorId
  }, userData: { admin, notVerified, notAdmin }
} = testData;

const API_VERSION = '/api/v1';
const BASE_URL = `${API_VERSION}/admin`;
const LOGIN_URL = `${API_VERSION}/auth/login`;
const {
  invalidAuthor, invalidAuthor1, invalidAuthor2, blankAuthor, validAuthor, validAuthor1,
  validAuthor2, missingAuthorInput, wrongLengthAuthor1, wrongLengthAuthor2,
} = authorData;
const {
  missingInput, blankInput,
} = userData;

chai.use(chaiHttp);

describe('ADMIN ROUTES', () => {
  let adminToken;
  let authorUrlForAdmin;
  let authorUrlForUnverified;
  let authorUrlForNonAdmin;
  let bookUrlForAdmin;
  let updateAuthorUrlForAdmin;

  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(admin)
      .end((error, response) => {
        adminToken = response.body.token;
        authorUrlForAdmin = `${BASE_URL}/author?token=${adminToken}`;
        bookUrlForAdmin = `${BASE_URL}/book?token=${adminToken}`;

        done();
      });
  });

  let unverifiedUserToken;
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(notVerified)
      .end((error, response) => {
        unverifiedUserToken = response.body.token;
        authorUrlForUnverified = `${BASE_URL}/author?token=${unverifiedUserToken}`;
        updateAuthorUrlForAdmin = `${BASE_URL}/author/3?token=${adminToken}`;
        done();
      });
  });

  let nonAdminToken;
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
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

  describe('Books Controller', () => {
    /**
     * Test the POST /addBook endpoint
     */

    it('should be able to add a book when all the parameters are given', (done) => {
      chai.request(app)
        .post(bookUrlForAdmin)
        .send(book)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to add a book that already exists', (done) => {
      chai.request(app)
        .post(bookUrlForAdmin)
        .send(book)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(409);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not create book if authorId is invalid', (done) => {
      chai.request(app)
        .post(bookUrlForAdmin)
        .send(badBook)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(400);
          expect(response.body.status).to.equal('failure');
          done();
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
          expect(response).to.have.status(409);
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
          expect(response).to.have.status(409);
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
  describe('Update And Delete Author Controller', () => {
    /**
     * Test the POST /admin/author endpoint
     */
    it('should be able to update an author', (done) => {
      chai.request(app)
        .patch(updateAuthorUrlForAdmin)
        .send({
          authorName: 'hamato yoshi'
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(200);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to add an author with name that already exists', (done) => {
      chai.request(app)
        .patch(updateAuthorUrlForAdmin)
        .send({
          authorName: 'hamato yoshi'
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(409);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should delete an author', (done) => {
      chai.request(app)
        .delete(updateAuthorUrlForAdmin)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(200);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to delete an that does not exist', (done) => {
      chai.request(app)
        .patch(updateAuthorUrlForAdmin)
        .send({
          authorName: 'hamato yoshi'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(404);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('should not be able to delete an that does not exist', (done) => {
      chai.request(app)
        .delete(updateAuthorUrlForAdmin)

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(404);
          expect(response.body.status).to.equal('failure');
          expect(response.body.message).to.be.a('string');
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
      .post(LOGIN_URL)
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
      roleId: process.env.PATRON_ROLE
    };
    chai.request(app)
      .post(`${BASE_URL}/user`)
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
      roleId: process.env.ADMIN_ROLE
    };
    chai.request(app)
      .post(`${BASE_URL}/user`)
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
  it('returns a status 404 if role does not exist', (done) => {
    const body = {
      firstName: 'Sunday',
      lastName: 'Oliseh',
      email: 'sundayoliseh@email.com',
      roleId: 4444
    };
    chai.request(app)
      .post(`${BASE_URL}/user`)
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
      .post(`${BASE_URL}/user`)
      .send(missingInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'roleId');
        expect(response.body.errors.body.firstName).to.equal('firstName is missing');
        expect(response.body.errors.body.lastName).to.equal('lastName is missing');
        expect(response.body.errors.body.email).to.equal('email is missing');
        expect(response.body.errors.body.roleId).to.equal('roleId is missing');
        done();
      });
  });
  it('should return validation errors for blank input fields in the request', (done) => {
    chai.request(app)
      .post(`${BASE_URL}/user`)
      .send(blankInput)
      .set('Authorization', usertoken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.haveOwnProperty('errors');
        expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'roleId');
        expect(response.body.errors.body.firstName).to.equal('firstName cannot be blank');
        expect(response.body.errors.body.lastName).to.equal('lastName cannot be blank');
        expect(response.body.errors.body.email).to.equal('email cannot be blank');
        expect(response.body.errors.body.roleId).to.equal('roleId cannot be blank');
        done();
      });
  });
  it('should return a status 401 if user does not have a valid token', (done) => {
    const body = {
      firstName: 'Peter',
      lastName: 'Taye',
      email: 'petertaye@email.com',
      roleId: 'user'
    };
    chai.request(app)
      .post(`${BASE_URL}/user`)
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
      .post(LOGIN_URL)
      .send(body)
      .end((err, response) => {
        const { token } = response.body;
        const body2 = {
          firstName: 'Peter',
          lastName: 'Taye',
          email: 'petertaye@email.com',
          roleId: 'user'
        };
        chai.request(app)
          .post(`${BASE_URL}/user`)
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
      .patch('/api/v1/admin/user/7')
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
        expect(response).to.have.status(409);
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
      .patch('/api/v1/admin/user/6')
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
        expect(response).to.have.status(409);
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
describe('ADMIN EDIT ROUTES', () => {
  let Token;
  let bookEditUrlForNonAdmin;
  let bookEditUrlForAdmin;
  let nonExistingBook;
  let badId;
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(admin)
      .end((error, response) => {
        Token = response.body.token;
        badId = `${BASE_URL}/book/iO?token=${Token}`;
        nonExistingBook = `${BASE_URL}/book/${600}?token=${Token}`;
        bookEditUrlForAdmin = `${BASE_URL}/book/${1}?token=${Token}`;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(notAdmin)
      .end((error, response) => {
        Token = response.body.token;
        bookEditUrlForNonAdmin = `${BASE_URL}/book/${6}?token=${Token}`;
        done();
      });
  });
  it('Edit book if user is an admin', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send(book2)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('book successfully updated');
        done();
      });
  });
  it('Edit book if one item is sent', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send({ title: 'thing we do' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('book successfully updated');
        done();
      });
  });
  it('Edit book if only authorId is sent', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send({ authorId: 9 })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('book successfully updated');
        done();
      });
  });
  it('Should not edit a book with bad input', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send(badBook2)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.errors.body.yearPublished).to.equal('yearPublished cannot be blank');
        done();
      });
  });
  it('Should not edit a book with bad id', (done) => {
    chai.request(app)
      .put(badId)
      .send(badBook2)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.errors.params.id).to.equal('id value must be at least 1 and an integer');
        done();
      });
  });
  it('Should not edit a book that dose not exist', (done) => {
    chai.request(app)
      .put(nonExistingBook)
      .send(book2)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('book does not exist');
        done();
      });
  });
  it('Should not edit a book if user not an admin', (done) => {
    chai.request(app)
      .put(bookEditUrlForNonAdmin)
      .send(book2)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('unauthorized user');
        done();
      });
  });
  it('Should not edit a book if isbn exist', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send(bookSameIsbn)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('isbn already exist');
        done();
      });
  });
  it('Should not edit an author if author id does not exist', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send(nonExistingAuthorId)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('author does not exist');
        done();
      });
  });
  it('Should not edit an book if body is empty', (done) => {
    chai.request(app)
      .put(bookEditUrlForAdmin)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('empty request body');
        done();
      });
  });
});
describe('ADMIN Delete ROUTES', () => {
  let Token;
  let bookDeleteUrlForNonAdmin;
  let bookDeleteUrlForAdmin;
  let nonExistingBook;
  let badId;
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(admin)
      .end((error, response) => {
        Token = response.body.token;
        badId = `${BASE_URL}/book/iO?token=${Token}`;
        nonExistingBook = `${BASE_URL}/book/${600}?token=${Token}`;
        bookDeleteUrlForAdmin = `${BASE_URL}/book/${10}?token=${Token}`;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(notAdmin)
      .end((error, response) => {
        Token = response.body.token;
        bookDeleteUrlForNonAdmin = `${BASE_URL}/book/${10}?token=${Token}`;
        done();
      });
  });
  it('Delete book if user is an admin', (done) => {
    chai.request(app)
      .delete(bookDeleteUrlForAdmin)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.message).to.equal('book successfully deleted');
        done();
      });
  });
  it('Should not delete book with bad id', (done) => {
    chai.request(app)
      .delete(badId)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.errors.params.id).to.equal('id value must be at least 1 and an integer');
        done();
      });
  });
  it('Should not delete a book that dose not exist', (done) => {
    chai.request(app)
      .delete(nonExistingBook)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.equal('book does not exist');
        done();
      });
  });
  it('Should not delete a book if user is not an admin', (done) => {
    chai.request(app)
      .delete(bookDeleteUrlForNonAdmin)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('failure');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('unauthorized user');
        done();
      });
  });
});
