import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { By } from '@angular/platform-browser';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    component.rating = 3; // Beispiel-Startwert
    component.max = 5;
    fixture.detectChanges();
  });

  it('should display the correct filled and empty stars', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toBe('★★★☆☆');
  });

  it('should increase rating and emit event when increase() called', () => {
    spyOn(component.ratingChanged, 'emit');
    component.increase();
    expect(component.rating).toBe(4);
    expect(component.ratingChanged.emit).toHaveBeenCalledWith(4);

    // nicht über max erhöhen
    component.rating = component.max;
    component.increase();
    expect(component.rating).toBe(component.max);
  });

  it('should decrease rating and emit event when decrease() called', () => {
    spyOn(component.ratingChanged, 'emit');
    component.decrease();
    expect(component.rating).toBe(2);
    expect(component.ratingChanged.emit).toHaveBeenCalledWith(2);

    // nicht unter 0 verringern
    component.rating = 0;
    component.decrease();
    expect(component.rating).toBe(0);
  });

  it('should update stars in DOM after rating change', () => {
    component.rating = 1;
    fixture.detectChanges();
    let span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toBe('★☆☆☆☆');

    component.increase();
    fixture.detectChanges();
    span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toBe('★★☆☆☆');
  });

  it('should call increase() when "+" button clicked', () => {
    spyOn(component, 'increase');
    const button = fixture.debugElement.queryAll(By.css('button'))[1]; // zweiter Button "+"
    button.triggerEventHandler('click', null);
    expect(component.increase).toHaveBeenCalled();
  });

  it('should call decrease() when "-" button clicked', () => {
    spyOn(component, 'decrease');
    const button = fixture.debugElement.queryAll(By.css('button'))[0]; // erster Button "-"
    button.triggerEventHandler('click', null);
    expect(component.decrease).toHaveBeenCalled();
  });
});
