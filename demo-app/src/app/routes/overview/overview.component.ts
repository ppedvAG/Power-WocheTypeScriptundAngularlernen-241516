import { Component } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';
import { OrderEventArg } from '../../components/card/card.component';
import { BehaviorSubject, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  private readonly dishSubject = new BehaviorSubject<Dish[]>([]);
  readonly dishes$ = this.dishSubject.asObservable();
  private subscription?: Subscription;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.subscription = this.productService
      .getDishes()
      // .pipe(startWith(this.productService.dishes))
      .subscribe((dishes) => this.dishSubject.next(dishes));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addOrder(args: OrderEventArg) {
    this.orderService.addOrder(args.tableNo, args.dish);
    this.messageService.addMessage(
      `${args.dish.title} an Tisch #${args.tableNo} bitte!`
    );
  }
}
