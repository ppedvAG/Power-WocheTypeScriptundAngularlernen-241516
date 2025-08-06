import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { provideHttpClient } from '@angular/common/http';
import { ChatComponent } from '../../components/chat/chat.component';
import { FormsModule } from '@angular/forms';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent, ChatComponent],
      imports: [FormsModule], // Notwendig für [ngModel]
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
