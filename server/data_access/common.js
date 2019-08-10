const knex = require('knex')(require('../knexfile'));
const bookshelf = require('bookshelf')(knex); // eslint-disable-line import/order

module.exports = {
  bookshelf,
  knex,
};
