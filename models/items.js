const { Crud } = require("../database/dbQueryHelpers");

class Items extends Crud {
  constructor() {
    super("items");
  }
}

module.exports = new Items();
