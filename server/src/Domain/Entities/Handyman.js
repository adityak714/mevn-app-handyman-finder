import {User} from './User.js';

class Handyman extends User {
    constructor(id, firstName, lastName, email, phoneNumber ,area, profession){
        super(id, firstName, lastName, email, phoneNumber);
        this.area = area;
        this.profession = profession;
    }
}