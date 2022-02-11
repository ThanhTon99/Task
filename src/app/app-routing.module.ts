import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateNotifyComponent } from './update-notify/update-notify.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  {path: '',redirectTo: '/login', pathMatch:'full'},
  {path: 'managetask', component: ManageTaskComponent},
  {path: 'updatenotify/:id', component: UpdateNotifyComponent},
  {path: 'manageemployee', component: ManageEmployeeComponent},
  {path: 'updatetask',component: UpdateTaskComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
