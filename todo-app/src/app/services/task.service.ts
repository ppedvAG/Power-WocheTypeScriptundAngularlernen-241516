import { Injectable, signal } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';
import { DateTime } from 'luxon';

const inTwoDays = () => {
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
  return twoDaysFromNow;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly items = signal<TaskItem[]>([
    {
      title: 'Angular Kurs absolvieren',
      priority: 'important',
      dueDate: new Date(),
      labels: ['angular', 'kurs'],
    } as TaskItem,
  ]);

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
