import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../server';

const API_VERSION = '/api/v1/admin';
chai.use(chaiHttp);

describe('Author\'s Controller', () => {
  /**
     * Test the POST /author endpoint
     */
  const authorUrl = `${API_VERSION}/author`;
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
