import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
})
export class TaskListComponent {
    @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

    get valid() {
        return this.formRef?.nativeElement.checkValidity();
    }

    taskList = [
        {
            title: 'Angular Kurs absolvieren',
        } as TaskItem,
    ];

    // Property fuer Statusausgabe
    status = '';
    currentStatusId = 0;

    addTask(e: Event, title: string) {
        e.preventDefault();

        if (!this.valid) {
            this.setStatus('Bitte geben Sie den Titel der Aufgabe ein.');
        } else {
            const newTask: TaskItem = {
                title,
                id: `${Date.now()}`,
                completed: false,
                priority: 'default',
            };

            this.taskList.push(newTask);
            this.setStatus(`${this.taskList.length} Aufgaben insgesamt`);

            this.formRef.nativeElement.reset();
        }
    }

    setStatus(message: string) {
        this.status = message;

        if (this.currentStatusId) {
            clearTimeout(this.currentStatusId);
        }

        this.currentStatusId = setTimeout(() => (this.status = ''), 3000);
    }
}
