import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  status = '';

  updateStatus<T>($event: T, type: string) {
    this.status = `${type}: ${JSON.stringify($event)}`;
  }
}
