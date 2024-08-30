import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TaskItem } from '../../lib/models/task-item';
import { parseTask } from './task-remote.service';

@Injectable({
    providedIn: 'root',
})
export class TaskSocketService {
    readonly subject = webSocket<TaskItem[]>('ws://localhost:3000').pipe(map((items) => items.map(parseTask)));
    readonly items = toSignal(this.subject);
}
