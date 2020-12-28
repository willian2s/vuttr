/* eslint-disable no-undef */
require('dotenv/config');

module.exports = {
  App: {
    port: process.env.PORT,
    database: {
      mongoUrl: process.env.URI_MONGODB,
    },
    auth: {
      privateKey: process.env.PRIVATE_KEY,
      tokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
    },
    logger: {
      enabled: true,
      level: 'info',
    },
  },
};
