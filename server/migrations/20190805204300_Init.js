const createExtension = (knex, extension) => {
  return knex.raw(`CREATE EXTENSION IF NOT EXISTS "${extension}"`);
};

const dropExtension = (knex, extension) => {
  return knex.raw(`DROP EXTENSION IF EXISTS "${extension}"`);
};

const createOnUpdateTimestampFunction = (knex) => {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION on_update_timestamp()
    RETURNS trigger AS $$
    BEGIN
      NEW."updatedAt" = now();
      RETURN NEW;
    END;
  $$ language 'plpgsql';
  `);
};

const dropOnUpdateTimestampFunction = (knex) => {
  return knex.raw('DROP FUNCTION on_update_timestamp();');
};

const addTimestampFields = (knex, table) => {
  table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
};

const addTimestampUpdateTrigger = (knex, table) => {
  return knex.raw(`
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON "${table}"
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `);
};

const createUserTable = (knex) => {
  return knex.schema.createTable('User', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('email').notNullable().unique().index();
    table.string('password').notNullable();
    table.string('displayName');
    addTimestampFields(knex, table);
  })
    .then(() => addTimestampUpdateTrigger(knex, 'User'));
};

const createAccessTokenTable = (knex) => {
  return knex.schema.createTable('AccessToken', (table) => {
    table.string('value', 172).unique().primary();
    table.uuid('userId').references('id').inTable('User').onDelete('CASCADE')
      .notNullable();
    table.boolean('revoked').defaultTo(false).notNullable();
    table.timestamp('expirationTimestamp').notNullable();
    addTimestampFields(knex, table);
  })
    .then(() => addTimestampUpdateTrigger(knex, 'AccessToken'));
};

const createGameTable = (knex) => {
  return knex.schema.createTable('Game', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.integer('defaultLife').notNullable();
    table.integer('playerCount').notNullable();
    addTimestampFields(knex, table);
  })
    .then(() => addTimestampUpdateTrigger(knex, 'Game'));
};

const createGameUserTable = (knex) => {
  return knex.schema.createTable('GameUser', (table) => {
    table.uuid('userId').references('id').inTable('User').notNullable();
    table.uuid('gameId').references('id').inTable('Game').notNullable();
    table.primary(['userId', 'gameId']);
    table.integer('lifeTotal').notNullable();
    addTimestampFields(knex, table);
  })
    .then(() => addTimestampUpdateTrigger(knex, 'GameUser'));
};

exports.up = (knex) => {
  return Promise.all([
    createExtension(knex, 'uuid-ossp'),
    createOnUpdateTimestampFunction(knex),
  ])
    .then(() => Promise.all([
      createUserTable(knex),
      createGameTable(knex),
    ]))
    .then(() => Promise.all([
      createGameUserTable(knex),
      createAccessTokenTable(knex),
    ]));
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('AccessToken'),
    knex.schema.dropTable('GameUser'),
  ])
    .then(() => Promise.all([
      knex.schema.dropTable('User'),
      knex.schema.dropTable('Game'),
    ]))
    .then(() => Promise.all([
      dropExtension(knex, 'uuid-ossp'),
      dropOnUpdateTimestampFunction(knex),
    ]));
};
