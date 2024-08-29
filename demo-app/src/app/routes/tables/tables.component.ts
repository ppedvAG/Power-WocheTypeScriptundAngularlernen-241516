import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, of, Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit, OnDestroy {
  public currentTable = 0;
  private params$ = of({} as Params);
  private subscription?: Subscription;

  constructor(
    public orderService: OrderService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.params$ = this.route.params;
  }

  ngOnInit() {
    // Eine Subscription von Observables hinterlaesst potentiel immer MemoryLeaks!
    // Deshalb muessen wir die Subscription in OnDestroy abschliessen
    this.subscription = this.params$
      .pipe(map((p) => p['id']))
      .subscribe((id) => (this.currentTable = id));
  }

  ngOnDestroy(): void {
    // Subscription aufraeumen und Speicher freigeben
    this.subscription?.unsubscribe();
  }

  getTitles() {
    return this.orderService
      .getTitlesByTable(this.currentTable)
      .map(([title, count]) => `${title} (${count})`);
  }

  getPrice() {
    return this.orderService.getPriceByTable(this.currentTable);
  }

  getOrderDate() {
    return this.orderService.getOrderDateByTable(this.currentTable);
  }

  payBill() {
    this.orderService.removeOrder(this.currentTable);
    this.messageService.addMessage(`Tisch #${this.currentTable} sagt Danke!`);

    this.router.navigate(['/']);
  }

  updateStatus<T>($event: T, type: string) {
    this.messageService.addMessage(`${type}: ${JSON.stringify($event)}`);
  }
}
