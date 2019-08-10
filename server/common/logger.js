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
  level: process.env.LOG_LEVEL || 'info',
  format: colorizedTimeFormat,
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
