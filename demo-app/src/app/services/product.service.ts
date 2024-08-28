import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly dishes: Dish[] = [
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

  constructor() {}

  getDishes(): Dish[] {
    // Kopie des Arrays erstellen mit spread operator und erneuten Kapselung im Array
    return [...this.dishes];
  }
}
