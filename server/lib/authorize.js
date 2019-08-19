const { AccessToken } = require('../data_access/models');
const { UnauthorizedError } = require('./httpError');

const BEARER_REGEX = /Bearer (\S*)/;

/**
 * Extract a Bearer token from the authorization header.
 */
const extractBearerToken = () => (req, res, next) => {
  if (!req.headers.authorization) return next();
  const match = BEARER_REGEX.exec(req.headers.authorization);
  req.token = match && match.length ? match[1] : undefined;
  return next();
};

const authorizeUser = () => (req, res, next) => {
  if (!req.token) return next(new UnauthorizedError('No access token found'));

  return AccessToken.query().findById(req.token).eager('user')
    .then((accessToken) => {
      if (!accessToken) return next(new UnauthorizedError('Invalid access token'));
      if (!accessToken.isValid) return next(new UnauthorizedError('Access token has expired'));
      req.user = accessToken.user;
      return next();
    });
};

module.exports = {
  extractBearerToken,
  authorizeUser,
};
