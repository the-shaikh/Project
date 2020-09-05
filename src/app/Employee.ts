import * as _  from 'lodash'

export class Employee {
    public Id : Number;
    public Name : String;

    constructor(id?,name?){
        this.Id = id;
        this.Name = name ? name : "";
    }
}