import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: "", pathMatch:"full", redirectTo: "products" },
  { path: "products", component: ProductListComponent },
  { path: "products/new", component: ProductNewComponent },
  { path: "products/:id", component: ProductDeleteComponent },
  { path: "products/:id/edit", component: ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
