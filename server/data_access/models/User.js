const { Model } = require('../common');

class User extends Model {
  static get tableName() {
    return 'User';
  }

  get hiddenFields() {
    return ['password'];
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

  // TODO: Implement this on base Model class
  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    this.hiddenFields.forEach(field => delete json[field]);
    return json;
  }
}

module.exports = User;
