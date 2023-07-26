import { Component, OnInit, ViewChild} from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { User } from '../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from '../services/router.service';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  product: Product={};
  
  order: Order={};

  totalAmount = 0;

  submitStatus: boolean = false;

  user: User = {};

  userFormValid: boolean = false;
  
  isFormHidden: boolean = true;

  totalProducts: Product[] = [];

  // Toggle UserForm between hidden and shown
  toggleUserForm() {
    this.isFormHidden = !this.isFormHidden;
    this.userForm.userForm.reset();
  }

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private orderService: OrderService,
    private fb: FormBuilder, private _snackBar: MatSnackBar, private routerService: RouterService) { }

// Get id of the product upon initialisation of this component
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      let id = +data.get('id')! ?? 0;
      this.productService.getProduct(+id).subscribe(data => {
          this.product = data;
          this.submitStatus = false;    //set the submission status flag to be false
      });
  });
  this.onChanges();  
}

// Method calculating the total amount from subscribing to value changes in quantity field
onChanges(): void {
  
  this.orderForm.get('quantity')?.valueChanges.subscribe(quantity => {
    if(quantity! >= 0)
    this.totalAmount = this.product.price! * quantity!;

    else
    this.totalAmount = 0;
  });

}

// Method receiveing the emitted user data from UserForm component
onUserFormValueChange(user: any) {
  this.user = user;
}

// Method to receive the validity of the user form in the UserForm component
userFormValidity(userFormValidity:any) {
  this.userFormValid = userFormValidity;
}

// OrderForm Form group
orderForm = this.fb.group({
  isEggless: [false],
  quantity: [, [Validators.required,Validators.min(1)]],
  message: [''],
  deliveryDetails: this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    street: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    state: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    pinCode: ['',[Validators.pattern(/^\d{6}$/), Validators.required]],
    phone: [,[Validators.required,Validators.pattern(/^[6789]\d{9,9}$/)]]

  })
})

// Getter method for the form controls
get quantity() { return this.orderForm.get("quantity"); }
get name() { return this.orderForm.get("deliveryDetails.name"); }
get street() { return this.orderForm.get("deliveryDetails.street"); }
get city() { return this.orderForm.get("deliveryDetails.city"); }
get state() { return this.orderForm.get("deliveryDetails.state"); }
get pinCode() { return this.orderForm.get("deliveryDetails.pinCode"); }
get phone() { return this.orderForm.get("deliveryDetails.phone"); }

// Method for placing the order
placeOrder() {
  
  let order: Order = {
    user: this.user as User,
    productName: this.product.name || '',
    productWeight: this.product.weight || '',
    isEggless: this.orderForm.get('isEggless')?.value!,
    quantity:  this.orderForm.get('quantity')?.value!,
    totalAmount: this.totalAmount,
    date: new Date,
    message: this.orderForm.get('message')?.value || '',
    deliveryDetails: {
      name: this.orderForm.get('deliveryDetails.name')?.value || '',
      street: this.orderForm.get('deliveryDetails.street')?.value || '',
      city: this.orderForm.get('deliveryDetails.city')?.value || '',
      state: this.orderForm.get('deliveryDetails.state')?.value || '',
      pinCode: this.orderForm.get('deliveryDetails.pinCode')?.value || '',
      phone: this.orderForm.get('deliveryDetails.phone')?.value || ''
    }
  }  

  // Calling the addOrder function of the orderService for adding the order to the server
  this.orderService.addOrder(order).subscribe({
    next: data => {
          this.submitStatus = true;
          this._snackBar.open('Order Placed successfully', 'OK', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
          this.routerService.navigateToHomePage();
        },
    error: err=> {
          alert("Failure while connecting to server, try again!!");
        }
  })
}

// Method to handle the CanDeactivate guard
canDeactivate() {
  if (!this.submitStatus && this.orderForm.dirty){
    this.submitStatus = confirm("You have not completed the purchase. Any details entered will be lost. Are you sure you want to leave?");    
    return this.submitStatus;
  }
  else
    return true;
}
}
