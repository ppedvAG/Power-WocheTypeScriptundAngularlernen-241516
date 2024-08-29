import { Component, Input } from '@angular/core';
import { MessageType } from '../../../lib/models/toast-message';

@Component({
    selector: 'app-status-element',
    templateUrl: './status-element.component.html',
    styleUrl: './status-element.component.css',
})
export class StatusElementComponent {
    @Input() type: MessageType = 'info';
}
