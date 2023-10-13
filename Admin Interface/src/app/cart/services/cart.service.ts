import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  'showModal': boolean = false;
  constructor(private http: HttpClient) {}
  getAllCarts() {
    return this.http.get(`${environment.baseUrl}/carts`);
  }
  getAllCartsByDate(params: any) {
    return this.http.get(
      `${environment.baseUrl}/carts?startdate=${params.start}&enddate=${params.end}`
    );
  }
  deleteCart(id: number) {
    return this.http.delete(`${environment.baseUrl}/carts/${id}`);
  }
}
