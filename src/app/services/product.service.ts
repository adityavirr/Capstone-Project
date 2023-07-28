import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsURL = "http://localhost:3000/products";  

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.productsURL);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get<Product>(`${this.productsURL}/${productId}`);
  }
}
