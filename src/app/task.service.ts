import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Input} from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  [x: string]: any;

  url = "http://localhost:3000/task"
  constructor(private http: HttpClient) { }
  getList(){  
    return this.http.get(this.url)
  }
  saveNotify(data:any){
    return this.http.post(this.url, data)    
  }

  deleteNotify(id: any){
    return this.http.delete(`${this.url}/${id}`)
  }

  getCurrentTask(id: number){
    return this.http.get(`${this.url}/${id}`)
  }

  updateNotify(id: number, data:any){
    return this.http.put(`${this.url}/${id}`, data)
  }

}
