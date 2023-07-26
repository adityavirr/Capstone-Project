import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersURL = "http://localhost:3000/orders";
  constructor(private http: HttpClient) { }

  addOrder(order:Order){
    return  this.http.post<Order>(this.ordersURL,order);
  }

  getOrders(){
    return this.http.get<Order[]>(this.ordersURL);
  }
}
