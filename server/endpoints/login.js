const bcrypt = require('bcrypt');
const express = require('express');
const { DateTime } = require('luxon');
const validate = require('express-validation');
const tokenGenerator = require('../lib/tokenGenerator');
const { AccessToken, User } = require('../data_access/models');
const schemas = require('../validation/schemas/login');

const router = express.Router();

const postLoginPassword = (req, res, next) => {
  const { email, password } = req.body;

  return User.query().findOne({ email })
    .then((user) => {
      if (!user) throw new Error('Unable to find user');
      if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid password');

      const accessToken = {
        value: tokenGenerator.accessToken(),
        userId: user.id,
        expirationTimestamp: DateTime.utc().plus({ day: 1 }),
      };

      return AccessToken.query().insert(accessToken);
    })
    .then(token => res.json(token))
    .catch(next);
};

router.post('/', validate(schemas.postLoginPassword), postLoginPassword);

module.exports = router;
