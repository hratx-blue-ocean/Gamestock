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
    return bcrypt
      .hash(password, 12)
      .then((hashed_pw) => {
        let newUser = {
          username,
          avatar,
          hashed_pw,
        };

        return super.create.call(
          this,
          newUser,
          "RETURNING id, username, avatar"
        );
      })
      .catch((err) => console.log("Unable to hash password: ", err));
  }

  compare(attempt, password) {
    return bcrypt.compare(attempt, password);
  }
}

module.exports = new Users();
