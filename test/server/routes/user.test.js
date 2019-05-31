import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server/index';

const { expect } = chai;

chai.use(chaiHttp);

const User = {
  firstName: 'john',
  lastName: 'doe',
  email: 'johndoe@gmail.com',
  password: 'joejoe',
  avatarUrl: 'https://gravatar.com/avatar/aed61baf1e9256ed7d70e2cbbfcba9aa?s=400&d=robohash&r=x',
};
const userSignup = '/signup';

// Test Signing up a user
describe('User signup', () => {

  it('It Should create user with right signup credentials', (done) => {
    chai.request(server)
      .post(userSignup)
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
      .post(userSignup)
      .send(User)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('user already exist');
        done();
      });
  });
});
