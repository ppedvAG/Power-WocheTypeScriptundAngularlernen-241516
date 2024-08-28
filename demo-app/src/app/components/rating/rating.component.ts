import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input({ required: true }) rating = 0;
  @Input() max = 5;
  @Output() ratingChanged = new EventEmitter<number>();

  get filled() {
    return '★'.repeat(this.rating);
  }

  get empty() {
    return '☆'.repeat(this.max - this.rating);
  }

  increase() {
    if (this.rating < this.max) {
      this.rating++;
      this.ratingChanged.emit(this.rating);
    }
  }

  decrease() {
    if (this.rating > 0) {
      this.rating--;
      this.ratingChanged.emit(this.rating);
    }
  }
}
