import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<any> {
  constructor(private productService: ProductsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const productDetails = this.productService.getProductById(
      route.params['id']
    );
    if (productDetails) {
      return productDetails;
    } else {
      return null;
    }
  }
}
