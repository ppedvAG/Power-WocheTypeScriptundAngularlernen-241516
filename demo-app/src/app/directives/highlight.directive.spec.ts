import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

// Dummy test component to apply the directive
@Component({
  template: `<div [appHighlight]="color">Test Content</div>`,
})
class TestHighlightComponent {
  color = 'yellow';
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestHighlightComponent],
    });
    fixture = TestBed.createComponent(TestHighlightComponent);
  });

  it('should highlight background with given color', () => {
    fixture.componentInstance.color = 'red';
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.style.backgroundColor).toBe('red');
  });

  it('should update highlight color when input changes before ngOnInit', () => {
    fixture.componentInstance.color = 'blue';
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(div.style.backgroundColor).toBe('blue');
  });
});
