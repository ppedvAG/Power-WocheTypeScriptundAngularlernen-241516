import { Component, Input } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { TaskService } from '../services/task.service';

@Component({
    selector: 'app-task-item', // CSS-Element-Selektor der Komponente
    templateUrl: './task-item.component.html', // Pfad zum HTML Templates
    styleUrls: ['./task-item.component.css'], // Pfade zu privaten Stylesheets
})
export class TaskItemComponent {
    @Input() item = { title: 'Nicht angegeben' } as TaskItem;

    constructor(private taskService: TaskService) {}

    setCompleted(completed: boolean) {
        this.taskService.updateTask(this.item.id, { completed });
    }

    deleteTask(id: string) {
        this.taskService.removeTask(id);
    }
}
