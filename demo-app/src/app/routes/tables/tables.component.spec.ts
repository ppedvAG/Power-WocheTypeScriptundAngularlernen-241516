import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesComponent } from './tables.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RatingComponent } from '../../components/rating/rating.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesComponent, RatingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
