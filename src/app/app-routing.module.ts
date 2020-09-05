import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogTimeComponent } from './log-time/log-time.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path : '', component :  HomeComponent},
  { path : 'dashboard', component :  DashboardComponent},
  { path : 'logtime', component :  LogTimeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LogTimeComponent, DashboardComponent, HomeComponent];
