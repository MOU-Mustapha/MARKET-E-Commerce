import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(`${environment.baseUrl}/products`);
  }
  getAllCategories() {
    return this.http.get(`${environment.baseUrl}/products/categories`);
  }
  getProductsByCategory(catName: string) {
    if (catName === 'all') {
      return this.http.get(`${environment.baseUrl}/products`);
    }
    return this.http.get(`${environment.baseUrl}/products/category/${catName}`);
  }
  getProductById(id: string) {
    return this.http.get(`${environment.baseUrl}/products/${id}`);
  }
}
