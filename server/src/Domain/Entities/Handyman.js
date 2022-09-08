import {User} from './User.js';

class Handyman extends User {
    constructor(id, firstName, lastName, email, phoneNumber, address, area, profession){
        super(id, firstName, lastName, email, phoneNumber, address);
        this.area = area;
        this.profession = profession;
    }
}