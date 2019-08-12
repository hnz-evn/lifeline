const BEARER_REGEX = /Bearer (\S*)/g;

/**
 * Extract a Bearer token from the authorization header.
 */
const extractBearerToken = () => (req, res, next) => {
  if (!req.headers.authorization) return next();
  const match = BEARER_REGEX.exec(req.headers.authorization);
  req.token = match && match.length ? match[1] : undefined;
  return next();
};

module.exports = {
  extractBearerToken,
};
