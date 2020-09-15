const { Crud } = require("../database/dbQueryHelpers");

class Collections extends Crud {
  constructor() {
    super("items_in_collection");
  }
}

module.exports = new Collections();
