const express = require('express');
const { Game } = require('../data_access/models');
const { authorizeUser } = require('../lib/authorize');

const router = express.Router();

const createGame = (req, res, next) => {
  const { defaultLife, playerCount } = req.body;

  return Game.query().insert({ defaultLife, playerCount })
    .then(game => res.json(game))
    .catch(next);
};

router.post('/', authorizeUser(), createGame);

module.exports = router;
