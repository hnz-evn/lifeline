const Joi = require('joi');

const postLoginPassword = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

module.exports = {
  postLoginPassword,
};
