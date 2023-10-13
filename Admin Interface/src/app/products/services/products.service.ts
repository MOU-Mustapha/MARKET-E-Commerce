import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  'addModal': boolean = false;
  'updateModal': boolean = false;
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
  addNewProduct(data: any) {
    return this.http.post(`${environment.baseUrl}/products`, data);
  }
  updateProduct(id: number, data: any) {
    return this.http.put(`${environment.baseUrl}/products/${id}`, data);
  }
}
