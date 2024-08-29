import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error = '';

  constructor(private accountService: AccountService, private router: Router) {}

  login() {
    if (this.accountService.loginAsGuest()) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Login fehlgeschlagen';
    }
  }

  loginAsGuest() {
    this.accountService.loginAsGuest();
    this.router.navigate(['/']);
  }
}
