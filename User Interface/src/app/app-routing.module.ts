import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { CartComponent } from './cart/components/cart/cart.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { ProductResolverService } from './products/services/product-resolver.service';

const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent,
    resolve: { productDetails: ProductResolverService },
  },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
