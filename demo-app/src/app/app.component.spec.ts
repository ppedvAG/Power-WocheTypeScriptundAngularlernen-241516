import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StatusComponent } from './components/status/status.component';
import { AccountService } from './services/account.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';

const username = 'demo-app';
const accountServiceMock = {
  currentUser: signal({ username }),
  currentUserName$: of(username),
} as AccountService;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent, StatusComponent],
      providers: [
        {
          provide: AccountService,
          useValue: accountServiceMock,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      `Hello, ${username}`
    );
  });
});
