const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 5000,
    dbConnectionString: 'mongodb://localhost:27017/test',
    authCookieName: 'auth_cookie',
    authHeaderName: 'auth',
    jwtSecret: 'secret',
    saltRounds: 10,
  },
  production: {},
};

module.exports = config[env];
