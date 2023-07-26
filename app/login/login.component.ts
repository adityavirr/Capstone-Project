import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private routerService: RouterService, 
    private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  isCodeIncorrect: boolean = false; 

  // LoginForm Form Group
  loginForm = this.fb.group({
    securityCode: ['',Validators.required]
  });

  get securityCode() { return this.loginForm.get("securityCode") };

  // Method to validate login credentials
  validateLogin() {
    const securityCode = this.loginForm.get('securityCode')?.value!;

    // Use Auth Service for authentication with the entered security code
    this.authService.verifyLogin(securityCode);

    // If login is successful, navigate to Order Requests
    if(this.authService.isLoggedIn()) {
      this._snackBar.open('You have successfully logged in!', 'OK', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
      this.routerService.navigateToOrderRequests();
    }
    // If login is unsuccessful, set error flag to true
    else{
      this.isCodeIncorrect = true;
    }
}

}
