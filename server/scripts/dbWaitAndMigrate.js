
/**
 * This script is used to keep a process busy until a connection has been made to a database.
 * Once the connection is established, the database will migrate to the latest version.
 */
const knex = require('knex');
const knexFile = require('../knexfile');

const DELAY = 5000;
const MAX_RETRIES = 10;

const wait = (tries) => {
  if (tries >= MAX_RETRIES) {
    process.stderr.write(`Max retries hit [${MAX_RETRIES}], aborting connection to DB.\n`);
    process.exit(1);
  }

  const db = knex(knexFile);

  db.raw('SELECT 1')
    .then(() => {
      process.stdout.write('Connected to DB, now migrating...\n');
      return db.migrate.latest();
    })
    .then(() => {
      process.stdout.write('Finished migrating, now seeding...\n');
      return db.seed.run();
    })
    .then(() => {
      process.stdout.write('Finished seeding.\n');
      process.exit(0);
    })
    .catch((error) => {
      return db.destroy()
        .then(() => {
          process.stdout.write(`Unable to connect to DB...\n${error}\nWaiting ${DELAY}ms...\n`);
          setTimeout(() => wait(tries + 1), DELAY);
        });
    });
};

wait(0);
