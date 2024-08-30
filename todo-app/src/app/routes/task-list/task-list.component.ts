import { Component, OnInit, computed, model } from '@angular/core';
import { TaskRemoteService } from '../../services/task-remote.service';
import { TaskLocalService } from '../../services/task-local.service';
import { TaskSocketService } from '../../services/task-socket.service';

type Mode = 'local' | 'rest' | 'socket';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
    selectedMode = model<Mode>('rest');

    tasks = computed(() => {
        switch (this.selectedMode()) {
            case 'local':
                return this.localService.items();

            case 'socket':
                return this.socketService.items();

            default:
                return this.remoteService.items();
        }
    });

    constructor(
        private localService: TaskLocalService,
        private remoteService: TaskRemoteService,
        private socketService: TaskSocketService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.remoteService.loadTasks();
    }
}
