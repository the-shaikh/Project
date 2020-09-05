import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {Employee} from './Employee';
import {Project} from './Project';
import { TimeLog} from './TimeLog'
import { Subject } from 'rxjs'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFirestore } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class TestService {

  employees : AngularFireList<Employee[]>;

  // employees : Employee[];
  projects : Project[];
  timelog : TimeLog[];


  
  private _getDataSource = new Subject<Employee[]>();
  getData$ = this._getDataSource.asObservable();
  
  constructor(private db: AngularFireDatabase, private FireService: AngularFirestore) { 
    
  }

  getEmployeesList() {
    return this.db.list('/Main/Employees').snapshotChanges();
  }
  
  getProjectList() {
    return this.db.list('/Main/Projects').snapshotChanges();
  }

  getTimeLog() {
    return this.db.list('/Main/TimeLog').snapshotChanges();
  }

  
  addTimeLog(data: any) {
    console.log("insdie service ")
    return new Promise<any>((resolve, reject) =>{
      this.FireService.collection('Main')
      .add(data)
      .then(res => {
        console.log("in res");
        console.log(res);
      }, err=> {
        console.log(err);
        reject(err);
      })
  });
  }
}
