import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  public static hasAdvertBeenShown = false
  @ViewChild ('content') content:any; 
  task:any = [];

  closeResult = '';
  constructor(
    private taskService : TaskService,
    private modalService : NgbModal,
    private config : NgbModalConfig
  ) {}

  ngOnInit(): void{
    this.taskService.getList().subscribe((result)=>{
      console.log(result)
      this.task = result
      this.open(this.content)
    }) 
  }

  open(content:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
