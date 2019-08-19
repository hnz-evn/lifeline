const express = require('express');
const { Game } = require('../data_access/models');
const { authorizeUser } = require('../lib/authorize');
const { NotFoundError } = require('../lib/httpError');

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
      if (!game) throw new NotFoundError(`Game ${id} does not exist`);
      const newGameUser = { id: req.user.id, lifeTotal: game.defaultLife };
      return game.$relatedQuery('users').relate(newGameUser);
    })
    .then(gameUser => res.json(gameUser))
    .catch(next);
};

const getGames = (req, res, next) => {
  return Game.query()
    .then(games => res.json(games))
    .catch(next);
};

const getGame = (req, res, next) => {
  const { id } = req.params;
  return Game.query().where({ id }).eager('users').first()
    .then((game) => {
      if (!game) throw new NotFoundError(`Game ${id} does not exist`);
      return res.json(game);
    })
    .catch(next);
};

router.get('/', authorizeUser(), getGames);
router.post('/', authorizeUser(), createGame);
router.get('/:id', authorizeUser(), getGame);
router.post('/:id/join', authorizeUser(), joinGame);

module.exports = router;
