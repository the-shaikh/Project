

export class Project{
    id: number;
    name:string;
    estimatedTime: number;

    constructor(Id?: any, Name? : any, Time?: any) {
        this.id = Id;
        this.name = Name ? Name : "";
        this.estimatedTime = Time;
    }
}