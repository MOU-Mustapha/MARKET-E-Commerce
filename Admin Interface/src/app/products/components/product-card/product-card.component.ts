import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() 'product': product;
  @Output() item = new EventEmitter();
  showAmount: boolean = false;
  amount: number = 1;
  constructor() {}
  add() {
    this.item.emit({
      item: this.product,
      quantity: this.amount,
    });
    this.showAmount = false;
  }
}
