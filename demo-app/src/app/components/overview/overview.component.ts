import { Component } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';
import { OrderEventArg } from '../card/card.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  get dishes(): Dish[] {
    return this.productService.getDishes();
  }

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  addOrder(args: OrderEventArg) {
    this.orderService.addOrder(args.tableNo, args.dish);
    this.messageService.addMessage(
      `${args.dish.title} an Tisch #${args.tableNo} bitte!`
    );
  }
}
