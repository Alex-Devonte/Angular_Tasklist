import { Injectable } from '@angular/core';
import { Task } from './task';

import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskDataService {
  tasks: Task[];
  private API_URL = environment.API_URL;
 //private APP_URL = environment.API_URL;
  constructor(private http:HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getUserID() {
    return JSON.parse(localStorage.getItem("token")).user_id;
  }

  getTask(id: string): Observable<Task> {
    const params = new HttpParams()
    .set('task_id', id);
    return this.http.get<Task>(this.API_URL + "getTask.php", {params: params});
  }

  getTasks(user_id: string): Observable<Task[]> {
    const params = new HttpParams()
    .set('user_id', user_id);
    return this.http.get<Task[]>(this.API_URL + "getTasks.php", {params: params})
    .pipe(
      catchError(this.handleError('getTasks', []))
    );
  }

  addTask(task: Task): Observable<Task> {
    const params = new HttpParams()
    .set('user_id', this.getUserID());

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.post<Task>(this.API_URL + "addTasks.php", task, {params: params, headers: headers})
    .pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(task: Task): Observable<Task> {
    const params = new HttpParams()
    .set('task_id', ""+task.task_id);
    params.set("task_name", task.task_name);
    return this.http.put<Task>(this.API_URL + "updateTask.php", JSON.stringify(task), httpOptions);
  }

  deleteTask(task_id: string): Observable<Task> {
    const params = new HttpParams()
    .set('task_id', task_id);
    
    return this.http.get<Task>(this.API_URL + "deleteTasks.php", {params: params})
    .pipe (
      catchError(this.handleError<Task>('deleteTask'))
    );
  }
}