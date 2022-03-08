import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  // template: `
  // <div *ngFor="let item of task">
  // <h3>
  //   <div *ngIf="task">
  //     <p>Tiêu Đề: {{item.name}}</p>
  //   </div>
  // </h3>
  // <div *ngIf="item.description">
  //   <p><strong>Mô Tả:</strong> {{item.description}}</p> 
  //   <strong>Nội Dung:</strong> <div [innerHtml]="item.content"></div>
  // </div>
  // </div>
  // <button (click)="yeucau()">Yeu cau</button>
  // `,
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  @Input('parentText') parentTextBoxValue?: String;
  @Input() parentClick?: Subject<void>
  @Output('ontextFromChild') passToParent = new EventEmitter<String>()

  task: any = [];
  clickCount = 0
  childTextBoxValue ?: string 
  
  constructor(
    private taskService: TaskService,
  ) { }
  
  incrementValue(){
    this.clickCount = this.clickCount+1
  }

  ngOnInit(): void {
    this.taskService.getList().subscribe((result) => {
      console.log(result)
      this.task = result
    }) 
     this.parentClick?.subscribe(()=> this.incrementValue())
  }

  passTextValueToParent(){
    this.passToParent.emit(this.childTextBoxValue)
  }
}
