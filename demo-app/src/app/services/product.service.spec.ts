import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(), // HttpTestingController bereitstellen
      ],
      // KEIN imports: [...] nötig, nur providers
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Sicherstellen, dass keine offenen Requests mehr vorhanden sind
  });

  it('should return predefined dishes array', () => {
    expect(service.dishes).toBeDefined();
    expect(service.dishes.length).toBeGreaterThan(0);
    expect(service.dishes.some((d) => d.title === 'Pizza')).toBeTrue();
  });

  it('should perform HTTP GET and map response to dishes', () => {
    const mockApiResponse = {
      recipes: [
        {
          name: 'Test Dish',
          mealType: ['Appetizer'],
          image: 'test-image.svg',
          difficulty: 'easy',
          instructions: ['Step 1', 'Step 2'],
          prepTimeMinutes: 10,
          cookTimeMinutes: 20,
        },
      ],
    };

    service.getDishes().subscribe((dishes) => {
      expect(dishes.length).toBe(1);

      const dish = dishes[0];
      expect(dish.title).toBe('Test Dish');
      expect(dish.course).toBe('starters');
      expect(dish.imagePath).toBe('test-image.svg');
      expect(dish.remarks).toBe('easy');
      expect(dish.description).toContain('- Step 1');
      expect(dish.price).toBeCloseTo(10 * 0.1 + 20 * 0.3);
    });

    const req = httpMock.expectOne(
      'https://dummyjson.com/recipes?limit=8&skip=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
