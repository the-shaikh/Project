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

    

    // this.selectEmployeeId = 3
    // this.selectProjectId = 4
    this.selectEmployee = new Employee(0,"");
    this.selectProject = new Project(0,"",0);


    this.testService.getEmployeesList().subscribe(res=>{
      this.employees.push(...res.map(
        item => new Employee(item.payload.val()["EmployeeID"],item.payload.val()["name"])
      ));
      console.log("employe test")
      console.log(this.employees)
      this.selectEmployee = this.employees.find(item => item.Id == this.selectEmployeeId);

    });

    this.testService.getProjectList().subscribe(res=>{
      this.projects.push(...res.map(
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


  projectChange() {
    this.selectProject = this.projects.find(item => item.id == this.selectProjectId);
    this.projectTimelogged = this.timelogs.filter(
      item => (
        // (this.selectEmployeeId==0 || item.employeeID == this.selectEmployeeId)  
        item.projectID == this.selectProjectId
        // && (this.selectProjectId==0 || item.projectID == this.selectProjectId)
      )
    ).reduce((sum, current) => sum + current.hoursLogged, 0);

    this.estimatedTime = this.projects.filter(
      item => (
        // (this.selectEmployeeId==0 || item.employeeID == this.selectEmployeeId)  
        item.id == this.selectProjectId
        // && (this.selectProjectId==0 || item.projectID == this.selectProjectId)
      )
    ).reduce((sum, current) => sum + current.estimatedTime, 0);
  }

  employeeChange(){

    console.log("insdie change")
    console.log(this.selectEmployeeId);
    this.selectEmployee = this.employees.find(item => item.Id == this.selectEmployeeId);
    this.employeeTimeLog = this.timelogs.filter(
    item => this.selectEmployeeId == 0 || item.employeeID == this.selectEmployeeId)
    .reduce((sum, current) => sum + current.hoursLogged, 0);
  }
  
}
