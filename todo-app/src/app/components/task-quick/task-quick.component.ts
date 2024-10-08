import { Component, Input } from '@angular/core';
import { TaskRemoteService } from '../../services/task-remote.service';
import { TaskItem } from '../../../lib/models/task-item';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-task-quick',
    templateUrl: './task-quick.component.html',
    styleUrl: './task-quick.component.css',
})
export class TaskQuickComponent {
    @Input() task: TaskItem = <TaskItem>{};

    editing = false;

    constructor(private taskService: TaskRemoteService, private toastService: ToastService) {}

    get creating() {
        return !this.task.id;
    }

    async submit() {
        if (this.task.title) {
            if (this.creating) {
                this.taskService.addTask(this.task);
                this.toastService.sendInfo(`"${this.task.title}" wurde erstellt`);
                this.task = <TaskItem>{};
            } else {
                this.taskService.updateTask(this.task.id!, this.task);
                this.toastService.sendInfo(`"${this.task.title}" wurde gespeichert`);
            }
            this.editing = false;
        }
    }
}
