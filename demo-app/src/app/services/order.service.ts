import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';

type DishInfo = ReturnType<typeof distinctAndCount>;

function distinctAndCount<T>(acc: [T, number][], item: T) {
  const existing = acc.find(([name]) => name === item);
  if (existing) {
    existing[1]++;
  } else {
    acc.push([item, 1]);
  }
  return acc;
}

interface Order {
  items: Dish[];
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [];

  constructor() {}

  get tables(): number[] {
    // Welche Tische sind besetzt?
    return Object.keys(this.orders).map(Number);
  }

  getByTable(tableNo: number): Dish[] {
    return this.orders[tableNo]?.items ?? [];
  }

  getTitlesByTable(tableNo: number): DishInfo {
    return this.getByTable(tableNo)
      .map((item) => item.title)
      .reduce(distinctAndCount, [] as DishInfo);
  }

  getPriceByTable(tableNo: number) {
    return this.getByTable(tableNo).reduce((a, b) => a + b.price, 0);
  }

  addOrder(tableNo: number, dish: Dish) {
    if (this.orders[tableNo]) {
      this.orders[tableNo].items.push(dish);
    } else {
      this.orders[tableNo] = {
        items: [dish],
        date: new Date(),
      };
    }
  }

  removeOrder(tableNo: number) {
    if (this.orders[tableNo]) {
      delete this.orders[tableNo];
    }
  }
}
