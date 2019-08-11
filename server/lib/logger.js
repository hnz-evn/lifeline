const winston = require('winston');

const colorizedTimeFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, ...args }) => {
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    const parsedArgs = Object.keys(args).length ? JSON.stringify(args, null, 2) : '';
    return `${ts} [${level}]: ${message} ${parsedArgs}`;
  }),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: colorizedTimeFormat,
  transports: [
    new winston.transports.Console(),
  ],
});

// Access-based logging middleware to use with Express
const expressLogger = () => (req, res, next) => {
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
};

module.exports = {
  log: logger,
  expressLogger,
};
