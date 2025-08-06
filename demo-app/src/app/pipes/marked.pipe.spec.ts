import { MarkedPipe } from './marked.pipe';
import { marked } from 'marked';

describe('MarkedPipe', () => {
  let pipe: MarkedPipe;

  beforeEach(() => {
    pipe = new MarkedPipe();
  });

  it('should convert markdown string to HTML string', () => {
    const markdown = '# Hello';
    const result = pipe.transform(markdown);
    expect(result).toContain('<h1>');
    expect(result).toContain('Hello');
  });

  it('should return empty string for empty input', () => {
    const result = pipe.transform('');
    expect(result).toBe(marked('')); // Erwartet leeres HTML, meist ''
  });
});
