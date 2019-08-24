const express = require('express');
const validate = require('express-validation');
const { Game } = require('../data_access/models');
const { authorizeUser } = require('../lib/authorize');
const { NotFoundError } = require('../lib/httpError');
const schemas = require('../validation/schemas/games');

const router = express.Router();

const postCreateGame = (req, res, next) => {
  const { defaultLife, playerCount } = req.body;

  return Game.query().insert({ defaultLife, playerCount })
    .then(game => res.json(game))
    .catch(next);
};

const postJoinGame = (req, res, next) => {
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

const getFindGames = (req, res, next) => {
  return Game.query()
    .then(games => res.json(games))
    .catch(next);
};

const getFindGame = (req, res, next) => {
  const { id } = req.params;
  return Game.query().where({ id }).eager('users').first()
    .then((game) => {
      if (!game) throw new NotFoundError(`Game ${id} does not exist`);
      return res.json(game);
    })
    .catch(next);
};

router.get('/',
  authorizeUser(),
  getFindGames);

router.get('/:id',
  authorizeUser(),
  validate(schemas.getFindGame),
  getFindGame);

router.post('/',
  authorizeUser(),
  validate(schemas.postCreateGame),
  postCreateGame);

router.post('/:id/join',
  authorizeUser(),
  validate(schemas.postJoinGame),
  postJoinGame);

module.exports = router;
