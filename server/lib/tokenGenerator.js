const crypto = require('crypto');

const TOKEN_WIDTH_BYTES = 128;

const cryptoBytesToBase64String = (numBytes) => {
  return crypto.randomBytes(numBytes).toString('base64').replace(/\+|\/|=/, '-');
};

exports.accessToken = () => cryptoBytesToBase64String(TOKEN_WIDTH_BYTES);
