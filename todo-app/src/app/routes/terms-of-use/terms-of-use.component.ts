import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { termsOfUseKey } from '../../guards/terms-of-use.guard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-terms-of-use',
    templateUrl: './terms-of-use.component.html',
    styles: `
    section {
      display: flex;
      flex-direction: column;
    }`,
})
export class TermsOfUseComponent {
    constructor(private toastService: ToastService, private router: Router, private route: ActivatedRoute) {}

    acceptTerms() {
        localStorage.setItem(termsOfUseKey, 'true');
        const url = this.route.snapshot.queryParams['returnUrl'] ?? '/';
        this.router.navigate([url]);
    }

    declineTerms() {
        localStorage.removeItem(termsOfUseKey);
        this.toastService.sendWarning('Was jetzt Meister?');
    }
}
