const { Crud } = require("../database/dbQueryHelpers");
const bcrypt = require("bcrypt");

/**
 * Users is a class with methods to interact with the users table, which
 * stores information (id, username, hashed password, salt) about users.
 * @constructor
 * @augments Crud
 */
class Users extends Crud {
  constructor() {
    //this sets tablename to users
    super("users");
  }

  /*
  creates a new user record in users table
  and returns a promise that is fulfilled with
  the succesful creation of said record
  */

  create({ username, avatar, password }) {
    bcrypt
      .hash(password, 12)
      .then((hash) => {
        let newUser = {
          username,
          avatar,
          hash,
          cookie,
        };

        return super.create.call(this, newUser);
      })
      .catch((err) => console.log("Unable to hash password"));
  }
}

module.exports = new Users();
