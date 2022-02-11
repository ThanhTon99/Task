import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  task:any = [];

  constructor(
    private taskService : TaskService,
  ) { }

  ngOnInit(): void {

    this.taskService.getList().subscribe((result)=>{
      console.log(result)
      this.task = result
    })
  }


}
