import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(AccountService);
  return Boolean(service.currentUser());
};

export const loginGuardAsync: CanActivateFn = async (route, state) => {
  // Ich moechte eine subscription verhindern
  // Eine andere Option ist, dass Observables zu einem Promise umzuwandeln
  const service = inject(AccountService);
  const user = await lastValueFrom(service.currentUser$);
  console.log('user in guard', user);
  return Boolean(user);
};
