const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const requestId = require('express-request-id');
const { ValidationError } = require('express-validation');
const { extractBearerToken } = require('./lib/authorize');
const { getJsFiles } = require('./lib/common');
const { HttpError, NotFoundError } = require('./lib/httpError');
const { log, expressLogger } = require('./lib/logger');

const app = express();
const port = 3000;

app.use(requestId());
app.use(bodyParser.json());
app.use(extractBearerToken());
app.use(expressLogger());
app.use(cors());

// Add helper response methods
app.use((req, res, next) => {
  res.apiSuccess = message => res.status(200).json({ message });
  res.apiAccepted = body => res.status(202).json(body);
  res.apiError = (code, error) => res.status(code).json({ error });

  next();
});

app.get('/', (req, res) => res.apiSuccess('Welcome to lifeline API!'));

// Register file's module.exports as Express router
const registerRouter = (file) => {
  const name = path.basename(file, '.js');
  app.use(`/${name}`, require(`./endpoints/${file}`)); // eslint-disable-line
  log.debug(`Registered ${file} at /${name}`);
};

// Load all the endpoint files, register them, and finally setup the error handler
const endpointsReady = () => {
  log.debug('Loading endpoints...');

  return getJsFiles('./endpoints/')
    .then((files) => {
      files.forEach(registerRouter);

      // Non-error requests that got here requested an undefined resource
      app.use((req, res, next) => next(new NotFoundError(`Unable to find [${req.method} ${req.originalUrl}].`)));

      // Error handler at then end of the middleware stack as a catch-all
      app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
        log.error(error);

        if (error.stack) {
          log.error(error.stack);
        }

        if (typeof error === 'string') {
          res.apiError(500, error);
        } else if (error instanceof ValidationError) {
          res.apiError(error.status, error.errors);
        } else if (error instanceof HttpError) {
          res.apiError(error.constructor.code, error.message);
        } else {
          res.apiError(500, error.message);
        }
      });

      log.debug('Endpoint registration complete');
    });
};

endpointsReady()
  .then(() => app.listen(port, () => log.info(`Listening on port ${port}...`)));
