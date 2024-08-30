export type MealType =
  | 'Lunch'
  | 'Dinner'
  | 'Dessert'
  | 'Side Dish'
  | 'Appetizer'
  | 'Breakfast'
  | 'Beverage'
  | 'Snack';

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  userId: number;
  rating: number;
  image: string;
  tags: string[];
  mealType: MealType[];
}
