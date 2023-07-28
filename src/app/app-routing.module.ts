import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsViewComponent } from './products-view/products-view.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductIdGuard } from './services/product-id.guard';


const routes: Routes = [
  { path: "products", component: ProductsViewComponent},
  { path: "products/:id", component: OrderViewComponent,canActivate: [ProductIdGuard], canDeactivate: [CanDeactivateGuard]},
  { path: "orders-list", component: OrdersListComponent,canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
