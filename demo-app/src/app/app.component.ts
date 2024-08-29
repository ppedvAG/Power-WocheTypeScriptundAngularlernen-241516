import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from './services/order.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private subscription?: Subscription;

  constructor(
    public orderService: OrderService,
    public accountService: AccountService,
    router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
