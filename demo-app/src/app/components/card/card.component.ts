import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // Hier verwenden wir die neuen Angular signals statt die herkoemmlichen Decorators @Input und @Output
  // Dabei ist zu beachten, dass wir title wie eine function aufrufen muessen: const value = title()
  title = input<string>('');
  price = input<number>(0);
  ordered = output<{}>();

  order() {
    this.ordered.emit({
      title: this.title(),
    });
  }
}
