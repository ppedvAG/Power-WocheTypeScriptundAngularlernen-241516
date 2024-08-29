import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
})
export class TaskListComponent {
    constructor(public taskService: TaskService) {}
}
