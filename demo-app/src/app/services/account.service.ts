import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Credentials, User } from '../models/user.model';
import { map, Subject, tap } from 'rxjs';

const guest = {
  username: 'gast',
  password: '',
} as User;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly currentUserSubject = new Subject<Credentials | null>();
  readonly currentUser$ = this.currentUserSubject.asObservable();

  // Statt Subject und Observable die neuen Signals verwenden
  readonly currentUser = signal<Credentials | null>(null);

  // Alternativ das Observable zu einem Signal umwandeln
  // readonly currentUser = toSignal(this.currentUser$);

  private readonly registeredUsers = signal<User[]>([guest]);

  readonly currentUserName$ = this.currentUser$.pipe(
    map((user) => user?.username),
    tap(console.log) // jedes mal wenn currentUserSubject sich aendert
  );

  readonly loggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  constructor() {}

  login(credentials: Credentials): boolean {
    const matchUser = (user: Credentials) =>
      user.username === credentials.username &&
      user.password === credentials.password;

    if (this.registeredUsers().find(matchUser)) {
      this.currentUserSubject.next(credentials);

      // neuere Variante mit Signals
      this.currentUser.set(credentials);
      return true;
    }
    return false;
  }

  loginAsGuest() {
    return this.login(guest);
  }

  logout() {
    this.currentUserSubject.next(null);

    // neuere Variante mit Signals
    this.currentUser.set(null);
  }

  register(user: User) {
    this.registeredUsers.update((users) => [...users, user]);
    this.login(user);
  }
}
