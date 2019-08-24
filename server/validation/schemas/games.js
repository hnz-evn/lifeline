const Joi = require('joi');

const getFindGame = {
  params: {
    id: Joi.string().uuid().required(),
  },
};

const postCreateGame = {
  body: {
    defaultLife: Joi.number().required(),
    playerCount: Joi.number().required(),
  },
};

const postJoinGame = {
  params: {
    id: Joi.string().uuid().required(),
  },
};

module.exports = {
  getFindGame,
  postCreateGame,
  postJoinGame,
};
