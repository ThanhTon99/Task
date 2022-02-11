import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from '../task.service'; 
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery'
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {

  @ViewChild ('content') content:any; 
  task : any = []; 
  collection : any = [];
  dtOptions : DataTables.Settings={}; 
  closeResult = '';

  notifyData !: any
  formValue !: FormGroup
  constructor(
    private taskService: TaskService,
    private modalService : NgbModal,    
    ) { }

  ngOnInit(): void {
    
    this.dtOptions ={
      pagingType:'full_numbers',
      pageLength: 5,
      lengthMenu:[5, 10, 15, 20],
      processing: true
    }
    this.taskService.getList().subscribe((result)=>{
      console.warn(result)
      this.collection = result
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
    })  
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

  deleteNotify(item:any){
    this.collection.splice(item-1,1)
    this.taskService.deleteNotify(item).subscribe((result)=>{
      console.log(result); 
      alert("Notify Deleted")
      this.getAllNotify()
    })
  }
  getAllNotify(){
    this.taskService.getList().subscribe(res=>{
      this.notifyData = res
    })
  }
}


