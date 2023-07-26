import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
headerTitle: string = "Bake My Cake";

@Input()
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private routerService: RouterService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }
  
  logout() {
    this.authService.logout();
    this.loggedIn = this.authService.isLoggedIn();
    if(!this.loggedIn) {
      this._snackBar.open('Log out successful!', 'OK', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    this.routerService.navigateToHomePage();
  }
  }

}
