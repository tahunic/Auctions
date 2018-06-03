var request = require('supertest');
var server = require('../../server');

describe('GET /api/login', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/api/login')
      .expect(200, done);
  });
});

describe('GET /api/signup', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/api/signup')
      .expect(200, done);
  });
});

describe('POST /api/auctions', function() {
  it('should return unauthorized', function(done) {
    request(server)
      .post('/api/auctions')
      .expect(401, done);
  });
});

describe('GET /api/auctions/won', function() {
  it('should return unauthorized', function(done) {
    request(server)
      .get('/api/auctions/won')
      .expect(401, done);
  });
});

describe('GET /api/auctions', function() {
  it('should return unauthorized', function(done) {
    request(server)
      .get('/api/auctions')
      .expect(401, done);
  });
});

describe('GET /api/auctions/:id', function() {
  it('should return unauthorized', function(done) {
    request(server)
      .get('/api/auctions/:id')
      .expect(401, done);
  });
});


describe('POST /api/bids', function() {
  it('should return unauthorized', function(done) {
    request(server)
      .post('/api/bids')
      .expect(401, done);
  });
});