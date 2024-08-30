import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRemoteService } from '../../services/task-remote.service';
import { ToastService } from '../../services/toast.service';
import { TaskItem } from '../../../lib/models/task-item';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
    formGroup?: FormGroup;

    get labels(): FormArray {
        return <FormArray>this.formGroup?.get('labels');
    }

    addLabel() {
        this.labels.push(this.formBuilder.control(''));
    }

    get id(): string | null {
        return this.route.snapshot.paramMap.get('id');
    }

    get editing(): boolean {
        return Boolean(this.id);
    }

    constructor(
        private taskService: TaskRemoteService,
        private toastService: ToastService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const task =
            this.taskService.getTask(this.id ?? '') ??
            <TaskItem>{
                priority: 'default',
            };
        const dueDate = task.dueDate ? DateTime.fromJSDate(task.dueDate).toISODate() : '';
        const labels = task.labels ? task.labels.map((e) => this.formBuilder.control(e)) : [];
        this.formGroup = this.formBuilder.group({
            id: { value: task.id, disabled: true },
            title: [task.title, Validators.required],
            dueDate: dueDate,
            priority: task.priority,
            labels: this.formBuilder.array(labels),
        });
    }

    async submit() {
        const task: TaskItem = {
            id: this.id || '',
            title: this.formGroup!.value.title!,
            dueDate: this.formGroup!.value.dueDate
                ? DateTime.fromISO(this.formGroup!.value.dueDate).toJSDate()
                : undefined,
            priority: this.formGroup!.value.priority!,
            labels: this.labels.value,
            completed: false,
        };

        if (this.editing) {
            await this.taskService.updateTask(this.id!, task);
            this.toastService.sendInfo(`"${task.title}" wurde gespeichert`);
        } else {
            const list = await this.taskService.addTask(task);
            this.toastService.sendInfo(`${list.length} Aufgaben insgesamt`);
        }

        this.router.navigate(['/list']);
    }
}
