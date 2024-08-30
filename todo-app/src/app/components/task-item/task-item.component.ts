import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItem } from '../../../lib/models/task-item';
import { TaskRemoteService } from '../../services/task-remote.service';

@Component({
    selector: 'app-task-item', // CSS-Element-Selektor der Komponente
    templateUrl: './task-item.component.html', // Pfad zum HTML Templates
    styleUrls: ['./task-item.component.css'], // Pfade zu privaten Stylesheets
})
export class TaskItemComponent {
    @Input({ required: true }) item!: TaskItem;

    constructor(private taskService: TaskRemoteService, private router: Router) {}

    editTask(id: string) {
        this.router.navigate(['/edit', id]);
    }

    setCompleted(completed: boolean) {
        this.taskService.updateTask(this.item.id, { completed });
    }

    deleteTask(id: string) {
        this.taskService.removeTask(id);
    }
}
