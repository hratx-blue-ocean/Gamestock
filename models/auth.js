import Crud from '../database/dbQueryHelpers';

class Auth extends Crud {
    constructor(){
        super('hashed_pws');
    }

    create(userID, password) {


    }
}
module.exports = Auth;
