/* eslint-disable no-console */

const path = require('path');

const password = '$2b$10$8oYbNd9DPvdJzDZ158nA8uQOo/coMUtIBKB68GWRJDql6mqPWLf.G';
const users = [
  { email: 'evan@mail.com', displayName: 'Evan' },
  { email: 'jay@mail.com', displayName: 'Jay' },
  { email: 'oli@mail.com', displayName: 'Oli' },
  { email: 'mark@mail.com', displayName: 'Mark' },
  { email: 'saad@mail.com', displayName: 'Sa\'ad' },
].map(user => Object.assign({ password }, user));

const createUserTransaction = (knex) => {
  const checkUserAndInsert = (user, trx) => {
    const { email } = user;

    return knex('User').where({ email }).first().transacting(trx)
      .then((found) => {
        if (found) {
          console.log(`Account for ${email} already exists`);
          return null;
        }

        return knex('User').insert(user).transacting(trx)
          .then(() => console.log(`Created account for ${email}`));
      });
  };

  return trx => Promise.all(users.map(user => checkUserAndInsert(user, trx)))
    .then(trx.commit)
    .catch(trx.rollback);
};

exports.seed = (knex) => {
  return knex.transaction(createUserTransaction(knex))
    .catch((e) => {
      console.error(`Error running seed file [${path.basename(__filename)}]:\n${e.message}`);
      throw e;
    });
};
