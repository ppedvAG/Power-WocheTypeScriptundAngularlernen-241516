import { Injectable, signal } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    readonly items = signal<TaskItem[]>([{ title: 'Angular Kurs absolvieren' } as TaskItem]);

    addTask(task: Omit<TaskItem, 'id' | 'completed'>) {
        this.items.update((tasks) => [
            ...tasks,
            {
                ...task,
                id: `${Date.now()}`,
                completed: false,
            },
        ]);
    }
}
