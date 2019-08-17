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

const joinGame = (req, res, next) => {
  const { id } = req.params;

  return Game.query().where({ id }).first()
    .then((game) => {
      if (!game) throw new Error(`Game ${id} does not exist`);
      return game.$relatedQuery('users').relate(req.user.id);
    })
    .then(gameUser => res.json(gameUser))
    .catch(next);
};

router.post('/', authorizeUser(), createGame);
router.post('/:id/join', authorizeUser(), joinGame);

module.exports = router;
