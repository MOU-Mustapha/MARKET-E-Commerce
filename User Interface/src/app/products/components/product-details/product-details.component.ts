import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  'productDetails': any;
  constructor(private acRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.acRoute.data.subscribe((data) => {
      this.productDetails = data['productDetails'];
    });
  }
}
