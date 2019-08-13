const { DateTime } = require('luxon');
const { Model } = require('../common');

class AccessToken extends Model {
  static get tableName() {
    return 'AccessToken';
  }

  static get idColumn() {
    return 'value';
  }

  get isValid() {
    return DateTime.fromJSDate(this.expirationTimestamp) > DateTime.utc();
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'AccessToken.userId',
          to: 'User.id',
        },
      },
    };
  }
}

module.exports = AccessToken;
