import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-notify',
  templateUrl: './update-notify.component.html',
  styleUrls: ['./update-notify.component.css']
})
export class UpdateNotifyComponent implements OnInit {

  items : any = []
  alert:boolean = false
  @ViewChild('editForm')
  editForm!: NgForm;
  ckeditorContent: string = '';

  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute
    ) { }

  editModel= new Task('','','','','','')
     
  ngOnInit():void {
    console.log(this.router.snapshot.params['id'])
    this.taskService.getCurrentTask(this.router.snapshot.params['id']).
    subscribe((result:any)=>{
      this.editModel= new Task(result['id'],result['name'], result['description'],result['content'],result['start'],result['end'])
      }) 
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

  collection(){
    console.log(this.editForm.value);
    this.taskService.updateNotify(this.router.snapshot.params['id'],this.editForm.value).
    subscribe((result) =>{
      console.log(result);  
      this.alert =true
      //window.alert('Sửa Thành Công');     
    })
  }
  closeAlert(){
    this.alert = false
  }
}
