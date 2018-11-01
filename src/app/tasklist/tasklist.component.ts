import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task';
import { TaskDataService } from '../task-data.service';
import { AuthService } from '../guards/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  providers: [TaskDataService]
})
export class TasklistComponent implements OnInit {
  tasks: Task[];
  username = '';
  user_id = this.taskDataService.getUserID();

  constructor(private http:HttpClient, private taskDataService: TaskDataService, private auth:AuthService) {}

  ngOnInit() {
    this.getTasks(this.user_id);
    if(JSON.parse(localStorage.getItem("token"))) {
      this.username = JSON.parse(localStorage.getItem("token")).username;
    }
  }

  logout() {
    this.username = '';
    this.auth.logout();
  }

  getTasks(user_id: string) {
    this.taskDataService.getTasks(user_id)
    .subscribe(tasks => this.tasks = tasks);
  }
  
  addTask(name: string): void {
    name = name.trim();
    if (name.length == 0)
    {
      alert("Task cannot be empty");
    }
    else
    {
      this.taskDataService.addTask({task_id: 0, task_name: name })
      .subscribe(task => { 
        this.tasks.push(task);
      });
    }
  }

  editTask() {
    //TODO
  }

  deleteTask(task: Task) {
    //Return the tasks array the *deleted* task removed
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskDataService.deleteTask(task[0]).subscribe();
  }
}
