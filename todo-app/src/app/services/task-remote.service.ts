import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskItem } from '../../lib/models/task-item';
import { DateTime } from 'luxon';
import { lastValueFrom, map, startWith, switchMap, tap } from 'rxjs';
import { defaultTask } from './task-local.service';

const API_URL = 'http://localhost:3000';
const parseDate = <T>(obj: T) => (obj ? DateTime.fromISO(`${obj}`).toJSDate() : obj);
export const parseTask = (task: TaskItem) => ({ ...task, dueDate: parseDate(task.dueDate) });

@Injectable({
    providedIn: 'root',
})
export class TaskRemoteService {
    readonly items = signal<TaskItem[]>([defaultTask]);

    constructor(private http: HttpClient) {}

    loadTasks(): Promise<TaskItem[]> {
        // Observables werden per Konvention mit einem $ suffix gekennzeichnet
        const response$ = this.http.get<TaskItem[]>(`${API_URL}/items`).pipe(
            // Daten konvertieren da Date als string empfangen wird
            map((items) => items.map(parseTask)),
            // mit initialem array starten wenn noch keine Daten empfangen wurden
            startWith(this.items()),
            // Daten in das Signal setzen
            tap((items) => this.items.set(items))
        );
        return lastValueFrom(response$);
    }

    reload = switchMap(() => this.loadTasks());

    getTask(id: string): TaskItem | undefined {
        return id ? this.items().find((t) => t.id === id) : undefined;
    }

    async addTask(task: Omit<TaskItem, 'id' | 'completed'>) {
        const newTask = {
            ...task,
            id: `${Date.now()}`,
            completed: false,
        };
        this.items.update((items) => [...items, newTask]);
        return lastValueFrom(this.http.post(`${API_URL}/item`, newTask).pipe(this.reload));
    }

    async updateTask(id: string, task: Partial<TaskItem>) {
        const newTask = { ...this.getTask(id), ...task };
        return lastValueFrom(this.http.put(`${API_URL}/item/${id}`, newTask).pipe(this.reload));
    }

    async removeTask(id: string) {
        return lastValueFrom(this.http.delete(`${API_URL}/item/${id}`).pipe(this.reload));
    }
}
