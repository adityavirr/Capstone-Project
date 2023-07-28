import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private routerService: Router) { }

  navigateToHomePage(){
    this.routerService.navigate(['products']);
  }

  navigateToLoginView(){
    this.routerService.navigate(['login']);
  }

  navigateToOrderRequests(){
    this.routerService.navigate(['orders-list']);
  }

  navigateToPageNotFound(){
    this.routerService.navigateByUrl('**');
  }
}
