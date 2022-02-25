import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Task } from '../task';
import { Location } from '@angular/common';
import { TaskService } from '../task.service';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-add-notify',
  templateUrl: './add-notify.component.html',
  styleUrls: ['./add-notify.component.css']
})
export class AddNotifyComponent implements OnInit {
  
  alert:boolean = false
  @ViewChild('addForm')
  addForm!: NgForm;
  ckeditorContent: string = '';

  notifyData !: any
  formValue !: FormGroup

  constructor(
    private location: Location,
    private taskService: TaskService
    ) { }
  
  addModel = new Task('','','','','','','');
  ngOnInit() {

  }
  
  urls:string[]=[];
  onselect(e:any){
    if(e.target.files){
      for(let i=0; i<File.length; i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result)
        }
      }
    }
  }

  onSubmit(){
    this.taskService.saveNotify(this.addForm.value).subscribe((result) =>{
      console.log("result is here", result )
      this.alert =true
      this.addForm.reset({})
    })     
  }

  goBack(): void {
    this.location.back()
  }
  closeAlert(){
    this.alert = false
  }

  addNotifydetails(){
    this.taskService.saveNotify(this.addModel).subscribe(res=>{
      alert("Notify Added Successfully")
      let ref = document.getElementById('managetask')
      ref?.click()
      this.formValue.reset()
    },err=>{
      alert("Something Wrong")
    })
  }
  getAllNotify(){
    this.taskService.getList().subscribe(res=>{
      this.notifyData = res
    })
  }
}
