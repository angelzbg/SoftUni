const { assert } = require('chai');
const requestValidator = require('./01. Request Validator.js');

describe('01. Request Validator Tests', () => {
  it('Should return the request object', () => {
    assert.deepEqual(
      requestValidator({
        method: 'GET',
        uri: 'svn.public.catalog',
        version: 'HTTP/1.1',
        message: '',
      }),
      {
        method: 'GET',
        uri: 'svn.public.catalog',
        version: 'HTTP/1.1',
        message: '',
      }
    );
  });

  it('Should throw Invalid request header: Invalid Method', () => {
    assert.throw(
      () =>
        requestValidator({
          method: 'OPTIONS',
          uri: 'git.master',
          version: 'HTTP/1.1',
          message: '-recursive',
        }),
      'Invalid request header: Invalid Method'
    );
  });

  it('Should throw Invalid request header: Invalid URI', () => {
    assert.throw(
      () =>
        requestValidator({
          method: 'GET',
          uri: '%appdata%',
          version: 'HTTP/1.1',
          message: '-recursive',
        }),
      'Invalid request header: Invalid URI'
    );
    assert.throw(
      () =>
        requestValidator({
          method: 'GET',
          uri: 'apt-get',
          version: 'HTTP/1.1',
          message: '-recursive',
        }),
      'Invalid request header: Invalid URI'
    );
    assert.throw(
      () =>
        requestValidator({
          method: 'GET',
          uri: '',
          version: 'HTTP/1.1',
          message: '-recursive',
        }),
      'Invalid request header: Invalid URI'
    );
  });

  it('Should throw Invalid request header: Invalid Version', () => {
    assert.throw(
      () =>
        requestValidator({
          method: 'POST',
          uri: 'home.bash',
          message: 'rm -rf /*',
        }),
      'Invalid request header: Invalid Version'
    );
  });

  it('Should throw Invalid request header: Invalid Message', () => {
    assert.throw(
      () =>
        requestValidator({
          method: 'POST',
          uri: '*',
          version: 'HTTP/1.1',
          message: '<script>alert("xss vulnerable")</script>',
        }),
      'Invalid request header: Invalid Message'
    );
    assert.throw(
      () =>
        requestValidator({
          method: 'POST',
          uri: '*',
          version: 'HTTP/1.1',
          message: "'; DROP TABLE",
        }),
      'Invalid request header: Invalid Message'
    );
  });
});
