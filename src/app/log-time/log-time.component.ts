import { Project } from './../Project';
import { Employee } from './../Employee';
import { TestService } from './../test.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.component.html',
  styleUrls: ['./log-time.component.css']
})
export class LogTimeComponent implements OnInit {

  constructor(private testService : TestService) { }


  employees : Employee[];
  projects : Project[];
  selectProjectId: number;
  selectEmployeeId : number;
  timelogged: number;
  date: string;
  employee: Employee;
  project : Project;

  ngOnInit(): void {

  this.employees = [];
  this.projects = [];
  this.selectEmployeeId;
  this.employee;
  this.project;

    this.testService.getEmployeesList().subscribe(res=>{
      this.employees.push(... res.map(
        item => new Employee(item.payload.val()["EmployeeID"],item.payload.val()["name"])
      ));
      console.log(this.employees)

    });

    this.testService.getProjectList().subscribe(res=>{
      this.projects.push(... res.map(
        item => new Project(item.payload.val()["ProjectID"],item.payload.val()["Name"],item.payload.val()["EstimatedTime"])
      ));
      console.log(this.projects)

    });
  }

  onSubmit(){

    this.employee = this.employees.find(emp => emp.Id == this.selectEmployeeId)
    this.project = this.projects.find(proj => proj.id == this.selectProjectId)

      let data ={
        ProjectID: this.project.id,
        ProjectName: this.project.name,
        EmployeeID: this.employee.Id,
        EmployeeName: this.employee.Name,
        DateLogged : this.date,
        HoursLogged : this.timelogged,
      }
      

      console.log("submitted")
      console.log(data);
     this.testService.addTimeLog(data)
         .then(res => {
             console.log("done")
             console.log(res);
         }).catch(err => {
           console.log("catch block")
         });
  }

}
