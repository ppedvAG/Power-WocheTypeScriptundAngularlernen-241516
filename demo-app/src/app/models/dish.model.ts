export type Course = 'starters' | 'mains' | 'desserts' | 'sides';

export interface Dish {
  title: string;
  course: Course;
  price: number;
  imagePath: string;
  remarks?: string;
  description?: string;
}
