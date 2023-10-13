import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  allProducts: product[] = [];
  allCategories: string[] = [];
  loading: boolean = false;
  'base64': any;
  'productFormAdd': FormGroup;
  'productFormUpdate': FormGroup;
  'updatedProductId': number;
  constructor(
    public productsService: ProductsService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {
    this.productFormAdd = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.productFormUpdate = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }
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
  closeModal() {
    this.productsService.addModal = false;
    this.productsService.updateModal = false;
  }
  onClick(e: any) {
    if (
      e.target.className === 'view-popup' ||
      e.target.className === 'view-popup ng-star-inserted'
    ) {
      this.productsService.addModal = false;
      this.productsService.updateModal = false;
    }
  }
  getCategoryAdd(event: any) {
    this.productFormAdd.controls['category'].setValue(event.target.value);
  }
  getCategoryUpdate(event: any) {
    this.productFormUpdate.controls['category'].setValue(event.target.value);
  }
  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
    };
    this.productFormAdd.controls['image'].setValue(file);
  }
  addProduct() {
    this.productsService
      .addNewProduct(this.productFormAdd.value)
      .subscribe((res: any) => {
        this.productsService.addModal = false;
        this.toastr.success('Product Added Successfully');
        this.productFormAdd.reset();
        this.base64 = '';
      });
  }
  update(product: any) {
    this.productFormUpdate.setValue({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    this.base64 = product.image;
    this.updatedProductId = product.id;
  }
  updateProduct() {
    this.productsService
      .updateProduct(this.updatedProductId, this.productFormUpdate.value)
      .subscribe((res) => {
        this.productsService.updateModal = false;
        this.toastr.success('Product Updated Successfully');
        this.productFormUpdate.reset();
        this.base64 = '';
      });
  }
}
