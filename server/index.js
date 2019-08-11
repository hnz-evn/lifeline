const bodyParser = require('body-parser');
const express = require('express');
const requestId = require('express-request-id');
const { log, expressLogger } = require('./common/logger');

const app = express();
const port = 3000;

app.use(requestId());
app.use(bodyParser.json());
app.use(expressLogger());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => log.info(`Listening on port ${port}...`));
