import { AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import { Employee } from './../Employee';
import { TimeLog } from './../TimeLog';
import * as _ from 'lodash'
import { Subject } from 'rxjs';
import { Project } from './../Project';
import { TestService } from './../test.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseApp } from 'angularfire2';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private testService : TestService) { 
  }
  employees : Employee[];
  projects : Project[];
  timelogs : TimeLog[];
  selectEmployeeId: number;
  selectEmployee: Employee;
  selectProjectId: number = 0;
  selectProject: Project;
  projectTimelogged: number;
  estimatedTime: number;
  employeeTimeLog: number;
  
  ngOnInit(): void {
    
    this.employees = [];
    this.projects = [];
    this.timelogs = [];

    // this.employees= [
    //   {Id:1,Name:"Jack"},
    //   {Id:2,Name:"Billy"},
    //   {Id:3,Name:"Flint"},
    //   {Id:4,Name:"Crow"},
    // ];
    // this.projects = [
    //   {id:1,name:"Project1",estimatedTime: 5},
    //   {id:2,name:"Project2",estimatedTime: 8},
    //   {id:3,name:"Project3",estimatedTime: 10},
    // ];
    // this.timelogs = [
    //   {
    //     projectName: "Project1",
    //     projectID:1,
    //     employeeName:"Billy",
    //     employeeID:2,
    //     dateLogged:"12/08/2020",
    //     hoursLogged:2
    //   },{
    //     projectName: "Project1",
    //     projectID:1,
    //     employeeName:"Crow",
    //     employeeID:4,
    //     dateLogged:"12/08/2020",
    //     hoursLogged:1
    //   },{
    //     projectName: "Project3",
    //     projectID:3,
    //     employeeName:"Flint",
    //     employeeID:3,
    //     dateLogged:"12/08/2020",
    //     hoursLogged:5
    //   },{
    //     projectName: "Project2",
    //     projectID:2,
    //     employeeName:"Billy",
    //     employeeID:2,
    //     dateLogged:"12/08/2020",
    //     hoursLogged:3
    //   },
    // ];

    // this.selectEmployeeId = 3
    // this.selectProjectId = 4
    this.selectEmployee = new Employee(0,"");
    this.selectProject = new Project(0,"",0);


    this.testService.getEmployeesList().subscribe(res=>{
      this.employees.push(... res.map(
        item => new Employee(item.payload.val()["EmployeeID"],item.payload.val()["name"])
      ));
      console.log("employe test")
      console.log(this.employees)
      this.selectEmployee = this.employees.find(item => item.Id == this.selectEmployeeId);

    });

    this.testService.getProjectList().subscribe(res=>{
      this.projects.push(... res.map(
        item => new Project(item.payload.val()["ProjectID"],item.payload.val()["Name"],item.payload.val()["EstimatedTime"])
      ));
      console.log(this.projects)
      this.selectProject = this.projects.find(item => item.id == this.selectProjectId);

    });

    this.testService.getTimeLog().subscribe(res=>{
      this.timelogs.push(... res.map(
        item => new TimeLog(
          item.payload.val()["ProjectName"],
          item.payload.val()["ProjectID"],
          item.payload.val()["EmployeeName"],
          item.payload.val()["EmployeeID"],
          item.payload.val()["DateLogged"],
          item.payload.val()["HoursLogged"],
        )
      ));
      console.log("time log test")
      console.log(this.timelogs)
      console.log(res)
    });



    this.estimatedTime = this.projects.reduce((sum, current) => sum + current.estimatedTime, 0);

    this.employeeTimeLog = this.timelogs.filter(
      item => (item.employeeID == this.selectEmployeeId)
    ).reduce((sum, current) => sum + current.hoursLogged, 0);

    this.projectTimelogged = this.timelogs.filter(
      item => (
        // (this.selectEmployeeId==0 || item.employeeID == this.selectEmployeeId)  
        item.projectID == this.selectProjectId
        // && (this.selectProjectId==0 || item.projectID == this.selectProjectId)
      )
    ).reduce((sum, current) => sum + current.hoursLogged, 0);

  };


  

  selectedProject(selectedProjectId: number){
    if(selectedProjectId>0)
      return true;
    else 
      return false;
  }
  
}
