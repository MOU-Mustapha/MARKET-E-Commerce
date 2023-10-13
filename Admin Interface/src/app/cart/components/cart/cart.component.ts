import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  'carts': any[];
  'dateForm': FormGroup;
  'cartDetails': any;
  'cartProducts': any[] = [];
  'loading': boolean = false;
  constructor(
    private toastr: ToastrService,
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) {
    this.dateForm = this.formBuilder.group({
      start: [''],
      end: [''],
    });
  }
  ngOnInit(): void {
    this.getCarts();
  }
  getCarts() {
    this.loading = true;
    this.cartService.getAllCarts().subscribe((carts: any) => {
      this.carts = carts;
      this.loading = false;
    });
  }
  apply() {
    this.loading = true;
    let date = this.dateForm.value;
    this.cartService.getAllCartsByDate(date).subscribe((carts: any) => {
      this.carts = carts;
      this.loading = false;
    });
  }
  deleteCart(id: number) {
    this.cartService.deleteCart(id).subscribe((res: any) => {
      this.toastr.success('Cart Deleted Successfully');
      this.carts = this.carts.filter((cart) => {
        return cart.id !== res.id;
      });
    });
  }
  closeModal() {
    this.cartService.showModal = false;
  }
  onClick(e: any) {
    if (e.target.className === 'view-popup') {
      this.cartService.showModal = false;
    }
  }
  viewProducts(index: number) {
    this.loading = true;
    this.cartProducts = [];
    this.cartDetails = this.carts[index];
    for (let product of this.cartDetails.products) {
      this.productService
        .getProductById(product.productId)
        .subscribe((res: any) => {
          this.cartProducts.push({
            item: res,
            quantity: product.quantity,
          });
          this.loading = false;
        });
    }
  }
}
