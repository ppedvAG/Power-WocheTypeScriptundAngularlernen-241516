import { Component, Input } from '@angular/core';
import { TaskItem } from '../../lib/models/task-item';

@Component({
    selector: 'app-task-item', // CSS-Element-Selektor der Komponente
    templateUrl: './task-item.component.html', // Pfad zum HTML Templates
    styleUrls: ['./task-item.component.css'], // Pfade zu privaten Stylesheets
})
export class TaskItemComponent {
    @Input() item = { title: 'Nicht angegeben' } as TaskItem;
}
