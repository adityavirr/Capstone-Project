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

  loginForm = this.fb.group({
    securityCode: ['',Validators.required]
  });

  get securityCode() { return this.loginForm.get("securityCode") };

  validateLogin() {
    const securityCode = this.loginForm.get('securityCode')?.value!;
    this.authService.verifyLogin(securityCode);
    if(this.authService.isLoggedIn()) {
      this.isCodeIncorrect = false;
      this._snackBar.open('You have successfully logged in!', 'OK', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
      this.routerService.navigateToOrderRequests();
    }
    else{
      this.isCodeIncorrect = true;
    }
}

}
