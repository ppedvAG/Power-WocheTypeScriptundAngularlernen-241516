import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast-list',
    templateUrl: './toast-list.component.html',
    styleUrl: './toast-list.component.css',
})
export class ToastListComponent {
    constructor(public service: ToastService) {}
}
