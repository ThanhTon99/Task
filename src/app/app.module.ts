import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { AddNotifyComponent } from './add-notify/add-notify.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { LoginComponent } from './login/login.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { UpdateNotifyComponent } from './update-notify/update-notify.component';
import { DataTablesModule } from 'angular-datatables';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { SignupComponent } from './signup/signup.component';
import { GreetingsPipePipe } from './greetings-pipe.pipe';
import { PopupComponent } from './popup/popup.component';

const routes: Routes =[
  {path: '',redirectTo: '/login', pathMatch:'full'},
  {path: 'addnotify', component: AddNotifyComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent},  

]

@NgModule({
  declarations: [												
    AppComponent,   
      AddNotifyComponent,  
      NotFoundComponent,
      HomeComponent,
      LoginComponent,
      ManageTaskComponent,
      UpdateNotifyComponent,
      ManageEmployeeComponent,
      UpdateTaskComponent,
      SignupComponent,
      GreetingsPipePipe,
      PopupComponent
   ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CKEditorModule,
    DataTablesModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
