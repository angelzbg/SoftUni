const requestValidator = (obj) => {
  if (!['GET', 'POST', 'DELETE', 'CONNECT'].includes(obj.method)) {
    throw new Error('Invalid request header: Invalid Method');
  }

  if (!obj.uri || (obj.uri !== '*' && obj.uri.match(/[^a-z0-9\.]/g))) {
    throw new Error('Invalid request header: Invalid URI');
  }

  if (!['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].includes(obj.version)) {
    throw new Error('Invalid request header: Invalid Version');
  }

  if (typeof obj.message !== 'string' || (obj.message !== '' && obj.message.match(/[<>\\'"\&]/g))) {
    throw new Error('Invalid request header: Invalid Message');
  }

  return obj;
};

module.exports = requestValidator;
