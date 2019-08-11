const bodyParser = require('body-parser');
const express = require('express');
const requestId = require('express-request-id');
const logger = require('./common/logger');

const app = express();
const port = 3000;

app.use(requestId());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Listening on port ${port}...`));
