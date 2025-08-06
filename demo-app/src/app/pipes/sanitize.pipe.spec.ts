import { SanitizePipe } from './sanitize.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule], // DomSanitizer ist unter BrowserModule verfügbar
      providers: [SanitizePipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SanitizePipe(sanitizer);
  });

  it('should sanitize a plain HTML string', () => {
    const unsafeHtml = '<script>alert("x")</script><p>Safe</p>';
    const sanitized = pipe.transform(unsafeHtml) as any; // SafeHtml
    // Der Rückgabewert ist ein "SafeHtml"-Objekt, nicht direkt string
    expect(sanitized).toBeTruthy();
    // Optional: Der getType()-Wert ist "HTML"
    expect(sanitized.changingThisBreaksApplicationSecurity).toContain(
      '<p>Safe</p>'
    );
  });

  it('should sanitize a Promise<string>', async () => {
    const unsafePromise = Promise.resolve('<div>Promise content</div>');
    const resultPromise = pipe.transform(unsafePromise);

    expect(resultPromise).toBeInstanceOf(Promise);

    const sanitized = await resultPromise;
    expect(sanitized).toBeTruthy();
    expect((sanitized as any).changingThisBreaksApplicationSecurity).toContain(
      'Promise content'
    );
  });
});
