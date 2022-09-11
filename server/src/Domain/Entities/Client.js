import {User} from './User.js';

class Client extends User {
    constructor(id, firstName, lastName, email, phoneNumber, address){
        super(id, firstName, lastName, email, phoneNumber, address);
    }
}

