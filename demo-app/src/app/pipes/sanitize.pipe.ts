import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize',
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | Promise<string>): SafeHtml | Promise<SafeHtml> {
    if (typeof value === 'string') {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    } else {
      return value.then((v) => this.sanitizer.bypassSecurityTrustHtml(v));
    }
  }
}
