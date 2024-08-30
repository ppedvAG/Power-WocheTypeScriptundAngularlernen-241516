import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuickComponent } from './task-quick.component';

describe('TaskQuickComponent', () => {
  let component: TaskQuickComponent;
  let fixture: ComponentFixture<TaskQuickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskQuickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
