const { Model } = require('objection');
const knex = require('knex')(require('../knexfile'));

Model.knex(knex);

class ExtendedModel extends Model {
  /**
   * Represents fields on a model that should be hidden on external
   * requests. Should be overridden when extending `ExtendedModel`.
   */
  static get hiddenFields() {
    return [];
  }

  /**
   * Overrides Model.$formatJson() to utilize ExtendedModel.hiddenFields
   * for hiding attributes from output JSON.
   */
  $formatJson(json, options) {
    const modelClass = this.constructor;
    const output = super.$formatJson(json, options);
    modelClass.hiddenFields.forEach(field => delete output[field]);
    return output;
  }
}

module.exports = {
  Model: ExtendedModel,
  knex,
};
