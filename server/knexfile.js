const requiredEnvVars = [
  'DB_CLIENT',
  'DB_HOST',
  'DB_USER',
  'DB_NAME',
];

if (!requiredEnvVars.every(envVar => envVar in process.env)) {
  process.stderr.write(`Missing one of the following environment variables: ${requiredEnvVars}`);
  process.exit(1);
}

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
