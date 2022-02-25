import { Component, OnInit, TemplateRef } from '@angular/core';
import {TaskService } from '../task.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor(
    private taskService : TaskService,
  ) { }

  ngOnInit(): void {
    
  }
  
}
