
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Input} from '@angular/core';
import { Task } from '../task';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(
    private taskService: TaskService,
    private formBuider: FormBuilder,
    private http : HttpClient,
    private router: Router
  ) { }

  ngOnInit():void {
    this.loginForm = this.formBuider.group({
      accout: [''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.accout === this.loginForm.value.accout && a.password === this.loginForm.value.password
      })
      if(user){
        this.loginForm.reset()
        this.router.navigate(['managetask'])
      }else{
        alert("User is not found")
      }
    },err=>{
      alert("Something Wrong !!!")
    })
  }
}
