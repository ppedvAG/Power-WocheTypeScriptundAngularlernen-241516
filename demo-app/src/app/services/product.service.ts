import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, Dish } from '../models/dish.model';
import { MealType, Recipe } from '../models/recipe.model';
import { map, Observable } from 'rxjs';

const url = 'https://dummyjson.com/recipes?limit=8&skip=0';
function toCourse(type: MealType[]): Course {
  if (type.includes('Side Dish')) {
    return 'sides';
  }
  if (type.includes('Dessert')) {
    return 'desserts';
  }
  if (type.includes('Appetizer')) {
    return 'starters';
  }
  return 'mains';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly dishes: Dish[] = [
    {
      title: 'Pizza',
      course: 'mains',
      price: 5.95,
      imagePath: 'pizza.svg',
      remarks: 'Empfehlung',
      description: '**Pizza** mit Kaese, Salami, Schinken und Oliven',
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
      description:
        'Salat mit Kartoffeln, Zwiebeln, Karotten und `Pommes Frites`',
    },
    {
      title: 'Cupcake',
      course: 'desserts',
      price: 3.99,
      imagePath: 'cake.svg',
    },
  ];

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<{ recipes: Recipe[] }>(url)
      .pipe(map((r) => r.recipes.map(this.toDish)));
  }

  private toDish(recipe: Recipe): Dish {
    const price = recipe.prepTimeMinutes * 0.1 + recipe.cookTimeMinutes * 0.3;

    return {
      title: recipe.name,
      course: toCourse(recipe.mealType),
      imagePath: recipe.image,
      remarks: recipe.difficulty,
      description: recipe.instructions.map((s) => `- ${s}`).join('\n'),
      price,
    };
  }
}
