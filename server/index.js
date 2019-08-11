const bodyParser = require('body-parser');
const express = require('express');
const requestId = require('express-request-id');
const logger = require('./common/logger');

const app = express();
const port = 3000;

app.use(requestId());
app.use(bodyParser.json());

// Access-based logging middleware
app.use((req, res, next) => {
  // Combine all arguments (minus req.params) and remove any that shouldn't be logged
  const blacklist = ['password'];
  const args = Object.assign({}, req.body, req.query);
  blacklist.filter(key => key in args).forEach(key => delete args[key]);

  logger.info([
    `Start Request [${req.id}]: ${req.method} ${req.originalUrl}`,
    Object.keys(args).length ? `Arguments:\n${JSON.stringify(args, null, 4)}` : '',
  ].join(' '));

  res.once('finish', () => {
    logger.info(`End Request [${req.id}]: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });

  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Listening on port ${port}...`));
