import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductIdGuard implements CanActivate {
  products: Product[] = [];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const productId = +(route.paramMap.get('id'))!;

    return this.productService.getProducts().pipe(map((data) => {
        this.products = data;
        if (productId >= 1 && productId <= this.products.length) {
          return true;
        } else {
          this.routerService.navigateToPageNotFound();
          return false;
        }
      })
    );
  }

  constructor(private routerService: RouterService, private productService: ProductService) { }
}
