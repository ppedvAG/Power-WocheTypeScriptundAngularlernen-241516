import { Injectable, signal } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { DateTime } from 'luxon';

export const defaultTask: TaskItem = {
    id: '1',
    title: 'Angular Kurs absolvieren',
    priority: 'important',
    dueDate: DateTime.now().plus({ day: 2 }).toJSDate(),
    completed: false,
    labels: ['angular', 'kurs'],
};

@Injectable({
    providedIn: 'root',
})
export class TaskLocalService {
    readonly items = signal<TaskItem[]>([defaultTask]);

    getTask(id: string): TaskItem | undefined {
        return id ? this.items().find((t) => t.id === id) : undefined;
    }

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

    updateTask(id: string, task: Partial<Omit<TaskItem, 'id'>>) {
        this.items.update((tasks) => {
            const index = tasks.findIndex((t) => t.id === id);
            if (index !== -1) {
                const updatedTask = { ...tasks[index], ...task };
                tasks.splice(index, 1, updatedTask);
            }
            return tasks;
        });
    }

    removeTask(id: string) {
        this.items.update((tasks) => tasks.filter((t) => t.id !== id));
    }
}
