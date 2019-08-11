const { Model } = require('../common');

class User extends Model {
  static get tableName() {
    return 'User';
  }

  static get relationMappings() {
    const Game = require('./Game');

    return {
      games: {
        relation: Model.ManyToManyRelation,
        modelClass: Game,
        join: {
          from: 'User.id',
          through: {
            from: 'GameUser.userId',
            to: 'GameUser.gameId',
          },
          to: 'Game.id',
        },
      },
    };
  }
}

module.exports = User;
