import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  currentTable = 0;

  constructor(
    public orderService: OrderService,
    private messageService: MessageService
  ) {}

  setTable(tableNo: number) {
    this.currentTable = tableNo;
  }

  getTitles() {
    return this.orderService
      .getTitlesByTable(this.currentTable)
      .map(([title, count]) => `${title} (${count})`);
  }

  getPrice() {
    return this.orderService.getPriceByTable(this.currentTable);
  }

  payBill() {
    this.orderService.removeOrder(this.currentTable);
  }

  updateStatus<T>($event: T, type: string) {
    this.messageService.addMessage(`${type}: ${JSON.stringify($event)}`);
  }
}
