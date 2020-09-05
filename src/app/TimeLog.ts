

export class TimeLog {
    projectName: string;
    projectID: number;
    employeeName: string;
    employeeID: number;
    dateLogged: string;
    hoursLogged: number;

    constructor(
        ProjectName:any, 
        ProjectId:any,
        EmployeeName:any,
        EmployeeID:any,
        DateLogged:any,
        HoursLogged:any,
    ){
        this.projectName = ProjectName;
        this.projectID = ProjectId;
        this.employeeName = EmployeeName;
        this.employeeID = EmployeeID;
        this.dateLogged = DateLogged;
        this.hoursLogged = HoursLogged;
    }
}