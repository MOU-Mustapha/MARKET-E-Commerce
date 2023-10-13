import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductCardComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, AppRoutingModule],
  exports: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductCardComponent,
  ],
})
export class ProductsModule {}
