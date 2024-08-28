import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusElementComponent } from './status-element.component';

describe('StatusElementComponent', () => {
  let component: StatusElementComponent;
  let fixture: ComponentFixture<StatusElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
