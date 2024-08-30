import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Credentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: Credentials = { username: '', password: '' };
  error = '';

  constructor(private accountService: AccountService, private router: Router) {}

  login() {
    if (this.accountService.login(this.credentials)) {
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
