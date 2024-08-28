import { Component } from '@angular/core';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  status = '';

  readonly dishes: Dish[] = [
    {
      title: 'Pizza',
      course: 'mains',
      price: 5.95,
      imagePath: 'pizza.svg',
      remarks: 'Empfehlung',
    },
    {
      title: 'Pasta',
      course: 'mains',
      price: 7.89,
      imagePath: 'pasta.svg',
    },
    {
      title: 'Salat',
      course: 'starters',
      price: 3.99,
      imagePath: 'salad.svg',
      remarks: 'Angebot',
    },
    {
      title: 'Cupcake',
      course: 'desserts',
      price: 3.99,
      imagePath: 'cake.svg',
    },
  ];

  updateStatus<T>($event: T, type: string) {
    this.status = `${type}: ${JSON.stringify($event)}`;
  }
}
