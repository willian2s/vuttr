/* eslint-disable no-undef */
require('dotenv/config');

module.exports = {
  App: {
    database: {
      mongoUrl: process.env.URI_MONGODB_TEST,
    },
    logger: {
      enabled: false,
    },
  },
};
