import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Credentials } from '../models/user.model';
import { map, Subject } from 'rxjs';

const guest = {
  username: 'gast',
  password: '',
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly currentUserSubject = new Subject<Credentials | null>();
  readonly currentUser$ = this.currentUserSubject.asObservable();
  readonly currentUser = toSignal(this.currentUser$);
  registeredUsers: Credentials[] = [guest];

  readonly currentUserName$ = this.currentUser$.pipe(
    map((user) => user?.username)
  );

  readonly loggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  constructor() {}

  login(credentials: Credentials): boolean {
    const matchUser = (user: Credentials) =>
      user.username === credentials.username &&
      user.password === credentials.password;

    if (this.registeredUsers.find(matchUser)) {
      this.currentUserSubject.next(credentials);
      return true;
    }
    return false;
  }

  loginAsGuest() {
    return this.login(guest);
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  register(user: Credentials) {
    this.registeredUsers.push(user);
    this.login(user);
  }
}
