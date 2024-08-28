import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dish } from '../../models/dish.model';

export type OrderEventArg = { dish: Dish; tableNo: number };

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // Hier verwenden wir die neuen Angular signals statt die herkoemmlichen Decorators @Input und @Output
  // Dabei ist zu beachten, dass wir title wie eine function aufrufen muessen: const value = title()
  // dish = input(<Dish>{});
  // title = computed(() => this.dish().title);
  // price = computed(() => this.dish().price);
  @Input({ required: true }) dish!: Dish;

  @Output() ordered = new EventEmitter<OrderEventArg>();

  order(tableNo: number) {
    this.ordered.emit({
      dish: this.dish,
      tableNo: tableNo,
    });
  }
}
