import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../../lib/models/toast-message';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    readonly items = signal<ToastMessage[]>([]);

    constructor() {}

    sendInfo(message: string) {
        this.sendMessage({
            type: 'info',
            title: 'Information',
            message,
        });
    }

    sendWarning(message: string) {
        this.sendMessage({
            type: 'warning',
            title: 'Warnung',
            message,
        });
    }

    sendError(message: string) {
        this.sendMessage({
            type: 'error',
            title: 'Fehler',
            message,
        });
    }

    private sendMessage(message: ToastMessage) {
        this.items.update((items) => [...items, message]);

        setTimeout(() => this.items.update((items) => items.slice(1)), 3000);
    }
}
