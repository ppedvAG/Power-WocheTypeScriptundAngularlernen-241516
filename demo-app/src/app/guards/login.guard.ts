import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { tap } from 'rxjs';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(AccountService);
  return Boolean(service.currentUser());
};

export const loginGuard$: CanActivateFn = (route, state) => {
  // Bug: Wert aus observable kommt einen Zyklus zu spaet an!
  const service = inject(AccountService);
  return service.loggedIn$.pipe(
    tap((v) => console.log('loginGuard', v ? 'okay' : 'nope'))
  );
};
