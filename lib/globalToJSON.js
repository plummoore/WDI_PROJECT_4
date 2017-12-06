function globalToJSON(schema) {
  schema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform(obj, json) {
      delete json.__v;
      delete json._id;
      delete json.password;
    }
  });
}

module.exports = globalToJSON;
