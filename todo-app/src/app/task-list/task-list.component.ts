import { Component } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
})
export class TaskListComponent {
    taskList = [
        {
            title: 'Angular Kurs absolvieren',
        } as TaskItem,
    ];

    // Property fuer Statusausgabe
    status = '';

    addTask(e: Event, title: string) {
        e.preventDefault();

        const newTask: TaskItem = {
            title,
            id: `${Date.now()}`,
            completed: false,
            priority: 'default',
        };

        this.taskList.push(newTask);
        this.setStatus(`${this.taskList.length} Aufgaben insgesamt`);
    }

    setStatus(message: string) {
        this.status = message;
        setTimeout(() => (this.status = ''), 3000);
    }
}
