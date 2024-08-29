import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
    @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

    get valid() {
        return this.formRef?.nativeElement.checkValidity();
    }

    constructor(private taskService: TaskService, private toastService: ToastService) {}

    addTask(e: Event, title: string, dueDate: Date | null = null) {
        e.preventDefault();

        if (!this.valid) {
            this.toastService.sendError('Bitte geben Sie den Titel der Aufgabe ein.');
        } else {
            this.taskService.addTask({
                title,
                dueDate: dueDate ?? undefined,
                priority: 'default',
            });

            const list = this.taskService.items();
            this.toastService.sendInfo(`${list.length} Aufgaben insgesamt`);

            this.formRef.nativeElement.reset();
        }
    }
}
