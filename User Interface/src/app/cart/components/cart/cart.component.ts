import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  'cartProducts': any[];
  'totalPrice': number;
  'showCart': boolean;
  'orderSuccess': boolean;
  'loading': boolean;
  constructor(
    private toastr: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getCartProducts();
    this.getCartTotalPrice();
    if (this.cartProducts.length > 0) {
      this.showCart = true;
    } else {
      this.showCart = false;
    }
  }
  getCartProducts() {
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
  }
  getCartTotalPrice() {
    this.totalPrice = 0;
    for (let product of this.cartProducts) {
      this.totalPrice += product.quantity * product.item.price;
    }
  }
  plusAmount(index: number) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
  }
  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getCartTotalPrice();
    }
  }
  detectAmountChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
  }
  deleteCartProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.toastr.success('Product Deleted Successfully');
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
    if (this.cartProducts.length === 0) {
      this.showCart = false;
    }
  }
  clearCart() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
    this.showCart = false;
  }
  addCart() {
    this.loading = true;
    const products = this.cartProducts.map((cartProduct) => {
      return { productId: cartProduct.item.id, quantity: cartProduct.quantity };
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: [products],
    };
    this.cartService.createNewCart(model).subscribe((res) => {
      this.orderSuccess = true;
      this.showCart = false;
      this.cartProducts = [];
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.loading = false;
    });
  }
}
