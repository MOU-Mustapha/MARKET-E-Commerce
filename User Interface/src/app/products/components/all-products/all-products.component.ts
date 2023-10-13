import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { cartProduct, product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  allProducts: product[] = [];
  allCategories: string[] = [];
  loading: boolean = false;
  cartProducts: cartProduct[] = [];
  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (products: any) => {
        this.allProducts = products;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(err.message);
        this.loading = false;
      }
    );
  }
  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe(
      (cats: any) => {
        this.allCategories = cats;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(err.message);
        this.loading = false;
      }
    );
  }
  categoryProducts(event: any) {
    this.loading = true;
    this.productsService.getProductsByCategory(event.target.value).subscribe(
      (catProds: any) => {
        this.allProducts = catProds;
        this.loading = false;
      },
      (err) => {
        this.toastr.error(err.message);
        this.loading = false;
      }
    );
  }
  addToCart(event: any) {
    if (localStorage.getItem('cart')) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    let existing = this.cartProducts.find(
      (item) => item.item.id === event.item.id
    );
    if (!existing) {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.toastr.success('Product Added To Cart');
    } else {
      this.toastr.warning('Product Already Added To Cart');
    }
  }
}
