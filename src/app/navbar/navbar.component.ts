import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
    private routerService: RouterService) { 
    this.isLoggedIn = this.authService.isLoggedIn();
   }

  isLoggedIn: boolean = false;

  // Method called whenever router outlet gets activated
  onLoggedIn($event: any){
    this.isLoggedIn = this.authService.isLoggedIn();
    if($event instanceof LoginComponent){
      this.isLoggedIn = false;
    }
  }

  // Method called when logout is clicked in the toolbar(sidenav)
  logout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.routerService.navigateToHomePage();
  }
}
