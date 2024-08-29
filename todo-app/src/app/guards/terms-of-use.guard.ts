import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const termsOfUseKey = 'accept-terms-of-use';

export const termsOfUseGuard: CanActivateFn = (route, state) => {
    const accepted = localStorage.getItem(termsOfUseKey);
    if (!Boolean(accepted)) {
        inject(Router).navigate(['terms-of-use'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    return true;
};
