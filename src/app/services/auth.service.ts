import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isUserLoggedIn: boolean = false;

  verifyLogin(securityCode: string) {

    return this.isUserLoggedIn = (securityCode === "NIIT");
  }

  logout() {
    this.isUserLoggedIn = false;
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
