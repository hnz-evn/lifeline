const bcrypt = require('bcrypt');
const express = require('express');
const { DateTime } = require('luxon');
const tokenGenerator = require('../lib/tokenGenerator');
const { AccessToken, User } = require('../data_access/models');

const router = express.Router();

const loginPassword = (req, res, next) => {
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

router.post('/', loginPassword);

module.exports = router;
