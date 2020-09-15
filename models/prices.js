const { Crud } = require("../database/dbQueryHelpers");

class Prices extends Crud {
  constructor() {
    super("items_value_by_date");
  }
}

module.exports = new Prices();
