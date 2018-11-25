import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from "../task";
import { TaskDataService } from '../task-data.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  constructor(private route: ActivatedRoute, private taskDataService: TaskDataService, private location: Location) { }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskDataService.getTask(""+id).subscribe(task => this.task = task[0]);
  }

  //Return user to previous page
  back(): void {
    this.location.back();
  }

  //save updated task
  save(): void {
    this.taskDataService.updateTask(this.task)
    .subscribe(() => this.back());
  }

}
