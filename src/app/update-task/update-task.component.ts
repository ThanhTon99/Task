import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-update-task',
  //templateUrl: './update-task.component.html',
  template: `
  
  <div class="parent">
    <div class="controls">
      <h3>My parent Component</h3>
      <input [(ngModel)]="parentTxtValue" type="text" class="form-control">
      <button (click)="onParentButtonClick()" type="button" class="btn btn-primary">Parent Click</button>
      <div class="txt">
        Value of child text box : {{childTextBoxValue}}
      </div>
    </div>
    <div class="child">
      <em *ngIf="mgs">{{mgs}}</em>
      <app-manage-employee
      (daxemEvent)="notifyMessage($event)"
      [parentText]="parentTxtValue"
      [parentClick]="parentClick"
      (ontextFromChild)="updateInChildValue($event)"
      >
      </app-manage-employee>
    </div>
  </div>
  <div class="modal" id="myModal">
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">
          Thông Báo
        </h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true"> × </span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="dateOfBirth">
              Date of birth
            </label>
            <div class="input-group">
              <input id="dateOfBirth" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker
                #dp="ngbDatepicker">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary calendar" (click)="dp.toggle()" type="button">
                  ...
                </button>
              </div>
            </div>
          </div>
          <div *ngFor="let item of task">
            <div *ngIf="task">
              <div [innerHtml]="item.content"></div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button (click)="onParentButtonClick()" type="button" class="btn btn-primary" (click)="modal.close('Save click')">
          Đã Xem
        </button>
      </div>
    </ng-template>
  </div>
  
  <div class="popup">
    <button class="btn btn-lg btn-outline-primary" (click)="open(content)">
      Chi Tiết
    </button>
    <div *ngFor="let item of task">
      <div *ngIf="task">
        <h2>Nội Dung.{{item.name}}</h2>
        <div [innerHtml]="item.content"></div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./update-task.component.css'],

})

export class UpdateTaskComponent implements OnInit {

  @ViewChild('content') content: any;

  task: any = [];
  closeResult = '';
  mgs?: string;
  selectedTask?: Task

  parentTxtValue?: String
  parentClick: Subject<void> = new Subject<void>()
  childTextBoxValue?: String

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) { }

  ngOnInit(): void {
    this.taskService.getList().subscribe((result) => {
      console.log(result)
      this.task = result
      //this.open(this.content)
    })
  }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  notifyMessage(event:any) {
    this.mgs = event
  }

  onParentButtonClick(){
    this.parentClick.next()
  }

  updateInChildValue(event:any){
    this.childTextBoxValue = event
  }

}
