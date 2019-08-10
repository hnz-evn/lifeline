const express = require('express');
const logger = require('./common/logger');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Listening on port ${port}...`));
